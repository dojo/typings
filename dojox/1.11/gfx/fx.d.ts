declare namespace dojox {
	namespace gfx {
		namespace fx {
			interface Fx {
				animateFill(options: dojo._base.AnimationArguments): dojo._base.Animation;
				animateFont(options: dojo._base.AnimationArguments): dojo._base.Animation;
				animateStroke(options: dojo._base.AnimationArguments): dojo._base.Animation;
				animateTransform(options: dojo._base.AnimationArguments): dojo._base.Animation;
			}
		}
	}
}

declare module 'dojox/gfx/fx' {
	const fx: dojox.gfx.fx.Fx;
	export = fx;
}
