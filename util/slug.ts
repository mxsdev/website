import slugify from 'slugify';

export function slug(val: string) {
    return slugify(val, {
        lower: true,
        trim: true,
    })
}