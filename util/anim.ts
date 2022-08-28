import { clampLeft } from "./math"

type Percentage = number
type Time = number

type PercentageGenerator = (time: Time) => Percentage
type TimeTransformer = (time: Time) => Time

export const wait = (waitDuration: Time) => (time: Time) =>
  clampLeft(0, time - waitDuration)
export const waitBefore =
  (duration: Time, generator: PercentageGenerator) => (time: Time) =>
    generator(wait(duration)(time))

export const waitCycle =
  (waitDuration: Time, duration: Time) =>
  (time: Time): Percentage => {
    const total = waitDuration + duration
    const reverse = Math.floor(time / total) % 2 === 1

    const prog = wait(waitDuration)(time % total)
    const fac = prog / duration

    return reverse ? 1 - fac : fac
  }
