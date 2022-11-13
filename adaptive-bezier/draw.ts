import { facBetween, mult2 } from './../util/math';
import { BezierDrawConfig, CubicBezier, Point } from './types';
import { beziercurvature, bezierPointsT } from "./sample"
import { bezierConfigDefaults } from './config';
import { mix } from "color2k"
import { clamp } from '../util/math';
import { call } from '../util/functional';

type EventFunc<K extends keyof HTMLElementEventMap> = (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any

export class BezierContext {
    controlPoints: CubicBezier<CanvasPoint>

    constructor(private canvas: HTMLCanvasElement, private ctx: CanvasRenderingContext2D, bezier: CubicBezier, private options: BezierDrawConfig) { 
        this.controlPoints = bezierMap(bezier, ([x, y]) => new CanvasPoint(x, y, options.controlPointRadius, options.controlPointColor))

        this.init()
    }

    public updateConfig(options: Partial<BezierDrawConfig> = {}) {
        this.options = {
            ...this.options,
            ...options
        }

        this.update()
    }

    private update() {
        const {
            strokeWidth,
            strokeColor,
            enableStroke,
            innerStrokeWidth,
            innerStrokeColor,
            enableInnerStroke,
            controlStrokeColor,
            controlStrokeWidth,
            bezierPointColor,
            bezierPointRadius,
            enableBezierPoints,
            controlPointRadius,
            controlPointColor,
        } = this.options

        this.controlPoints.forEach(pt => {
            pt.radius = controlPointRadius
            pt.color = controlPointColor
        })
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
        ;([[0, 1], [2, 3]]).forEach(([i, j]) => {
            this.ctx.beginPath()
            this.ctx.moveTo(this.controlPoints[i].x, this.controlPoints[i].y)
            this.ctx.lineTo(this.controlPoints[j].x, this.controlPoints[j].y)
    
            this.ctx.strokeStyle = controlStrokeColor
            this.ctx.lineWidth = controlStrokeWidth
            this.ctx.stroke()
        })
    
        ;([...this.controlPoints]).forEach((p) => {
            p.draw(this.ctx)
        })
    
        const bezier = bezierMap(this.controlPoints, p => p.vec())
    
        const bezierPts = bezierPointsT(bezier, strokeWidth)
    
        const pts = [ bezier[0], ...bezierPts.map(([pt]) => pt), bezier[3] ]
    
        // outer stroke
        if(enableStroke) {
            this.ctx.beginPath()
            polyline(this.ctx, pts)
        
            this.ctx.lineWidth = strokeWidth
            this.ctx.strokeStyle = strokeColor
            this.ctx.stroke()
        }
    
        // inner stroke
        if(enableInnerStroke) {
            this.ctx.beginPath()
            polyline(this.ctx, pts)
            
            this.ctx.lineWidth = innerStrokeWidth
            this.ctx.strokeStyle = innerStrokeColor
            this.ctx.stroke()
        }
    
        if(enableBezierPoints) {
            bezierPts.forEach(([p, t]) => {
                const curvature = Math.abs(1 / beziercurvature(t, bezier))
        
                const minCurvature = 2
                const maxCurvature = 300
        
                const fac = clamp(curvature, maxCurvature, minCurvature) / (maxCurvature - minCurvature)
        
                const col = typeof bezierPointColor === "string" ? bezierPointColor: mix(bezierPointColor[1], bezierPointColor[0], fac)
                new CanvasPoint(p[0], p[1], bezierPointRadius, col).draw(this.ctx)
            })
        }
    }

    private listenerClear: (() => void)[] = []

    private addListener<K extends keyof HTMLElementEventMap>(key: K, func: EventFunc<K>) {
        this.canvas.addEventListener(key, func)
        this.listenerClear.push(() => this.canvas.removeEventListener(key, func))
    }

    private clearListeners() {
        this.listenerClear.forEach(x => x())
        this.listenerClear = []
    }

    private init() {
        this.clearListeners()

        const { width, height } = this.canvas

        this.canvas.width *= window.devicePixelRatio
        this.canvas.height *= window.devicePixelRatio
        
        const ctx = this.canvas.getContext('2d')
        if(!ctx) {
            console.error("No this.canvas rendering context!")
            return
        }
        
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

        this.update()
        
        const getMousePos = ({ clientX, clientY }: MouseEvent): [ mouseX: number, mouseY: number ] => {
            const bb = this.canvas.getBoundingClientRect()
            
            return mult2([
                facBetween(clientX, bb.left, bb.right),
                facBetween(clientY, bb.top, bb.bottom)
            ], [width, height]);
        }

        this.addListener('mousedown', (event) => {
            const active = this.controlPoints.find(call("isContaining", ...getMousePos(event)))

            if(active) {
                active.startDrag()
            }
        })

        this.addListener('mouseup', (event) => {
            this.controlPoints.forEach(p => {
                p.endDrag()
            })
        })

        this.addListener('mousemove', (event) => {
            const [ mouseX, mouseY ] = getMousePos(event)

            const active = this.controlPoints.find(call("isDragging"))
            
            if(active) {
                active.x = mouseX
                active.y = mouseY

                this.update()
            }

            const hovered = this.controlPoints.find(p => p.isContaining(mouseX, mouseY))

            if(hovered) {
                this.canvas.style.cursor = "pointer"
            } else {
                this.canvas.style.cursor = ""
            }
        })
    }

    public deinit() {
        this.clearListeners()
    }
}

function polyline(ctx: CanvasRenderingContext2D, pts: Point[]) {
    ctx.moveTo(pts[0][0], pts[0][1])

    for (let i = 0; i < pts.length - 1; i++) {
        const p1 = pts[i]
        const p2 = pts[i+1]

        ctx.lineTo(p2[0], p2[1])
    }
}

class CanvasPoint {
    private dragging = false

    constructor(public x: number, public y: number, public radius: number, public color='black') { }

    isContaining(x: number, y: number) {
        return (x - this.x)**2 + (y - this.y)**2 <= this.radius**2
    }

    vec(): Point {
        return [this.x, this.y]
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)

        ctx.fill()
    }

    startDrag() {
        this.dragging = true
    }

    endDrag() {
        this.dragging = false
    }

    isDragging() {
        return this.dragging
    }
}

export function bezierMap<T, R>(arr: CubicBezier<T>, transform: (val: T, index: number) => R): CubicBezier<R> {
    return arr.map(transform) as CubicBezier<R>
}