declare namespace dojox {
	namespace gfx {
		namespace gradutils {
			interface GradUtils {
				getColor(fill: Fill, point: Point): dojo._base.Color;
				reverse(fill: Fill): Fill;
			}
		}
	}
}

declare module 'dojox/gfx/gradutils' {
	const gradutils: dojox.gfx.gradutils.GradUtils;
	export = gradutils;
}
