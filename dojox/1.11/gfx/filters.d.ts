declare namespace dojox {
	namespace gfx {
		namespace filters {
			interface BlendOptions extends FilterOptions {
				in?: string;
				in2?: string;
				mode?: string;
			}

			interface ColorMatrixOptions extends FilterOptions {
				in?: string;
				type?: string;
				values?: string;
			}

			interface ComponentTransferOptions extends FilterOptions {
				in?: string;
			}

			interface CompositeOptions extends FilterOptions {
				in?: string;
				in2?: string;
				k1?: string;
				k2?: string;
				k3?: string;
				k4?: string;
				operator?: string;
			}

			interface ConvolveMatrixOptions extends FilterOptions {
				bias?: string;
				divisor?: string;
				edgeMode?: string;
				in?: string;
				kernelMatrix?: string;
				kernelUnitLength?: string;
				order?: string;
				preserveAlpha?: string;
				targetX?: string;
				targetY?: string;
			}

			interface DiffuseLightingOptions extends FilterOptions {
				diffuseConstant?: string;
				in?: string;
				kernelUnitLength?: string;
				surfaceScale?: string;
			}

			interface DistantLightOptions extends FilterOptions {
				azimuth?: string;
				elevation?: string;
			}

			interface DisplacementMapOptions extends FilterOptions {
				in?: string;
				in2?: string;
				scale?: string;
				xChannelSelector?: string;
				yChannelSelector?: string;
			}

			interface FloodOptions extends FilterOptions {
				'flood-color'?: string;
				'flood-opacity'?: string;
			}

			interface GaussianBlurOptions extends FilterOptions {
				in?: string;
				edgeMode?: string;
				stdDeviation?: string;
			}

			interface ImageOptions extends FilterOptions {
				preserveAspectRatio?: string;
				'xlink:href'?: string;
			}

			interface MergeNodeOptions extends FilterOptions {
				in?: string;
			}

			interface MorphologyOptions extends FilterOptions {
				in?: string;
				operator?: string;
				radius?: string;
			}

			interface OffsetOptions extends FilterOptions {
				dx?: string;
				dy?: string;
				in?: string;
			}

			interface PointLightOptions extends FilterOptions {
				x?: string;
				y?: string;
				z?: string;
			}

			interface SpecularLightingOptions extends FilterOptions {
				in?: string;
				kernelUnitLength?: string;
				specularConstant?: string;
				specularExponent?: string;
				surfaceScale?: string;
			}

			interface SpotLightOptions extends FilterOptions {
				limitingConeAngle?: string;
				pointsAtX?: string;
				pointsAtY?: string;
				pointsAtZ?: string;
				specularExponent?: string;
				x?: string;
				y?: string;
				z?: string;
			}

			interface TileOptions extends FilterOptions {
				in?: string;
			}

			interface TurbulenceOptions extends FilterOptions {
				baseFrequency?: string;
				numOctaves?: string;
				seed?: string;
				stitchTiles?: string;
				type?: string;
			}

			interface Filter {
				_gfxName: string;
				height: string;
				primitives: FilterPrimitive[];
				width: string;
				x: string;
				y: string;
			}

			interface FilterOptions {
				[key: string]: any;
				height?: string;
				result?: string;
				width?: string;
				x?: string;
				y?: string;
			}

			interface FilterPrimitive {
				children: FilterPrimitive[];
				height?: string;
				result?: string;
				tag: string;
				width?: string;
				x?: string;
				y?: string;
			}

			interface Filters {
				createFilter(options?: FilterOptions, primitives?: FilterPrimitive[]): FilterPrimitive;
				feBlend(options: BlendOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feColorMatrix(options: ColorMatrixOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feComponentTransfer(options: ComponentTransferOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feComposite(options: CompositeOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feConvolveMatrix(options: ConvolveMatrixOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feDiffuseLighting(options: DiffuseLightingOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feDisplacementMap(options: DisplacementMapOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feDistantLight(options: DistantLightOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feFlood(options: FloodOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feFuncA(options: FilterOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feFuncB(options: FilterOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feFuncG(options: FilterOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feFuncR(options: FilterOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feGaussianBlur(options: GaussianBlurOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feImage(options: ImageOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feMerge(options: FilterOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feMergeNode(options: MergeNodeOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feMorphology(options: MorphologyOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feOffset(options: OffsetOptions, children?: FilterPrimitive[]): FilterPrimitive;
				fePointLight(options: PointLightOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feSpecularLighting(options: SpecularLightingOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feSpotLight(options: SpotLightOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feTile(options: TileOptions, children?: FilterPrimitive[]): FilterPrimitive;
				feTurbulence(options: TurbulenceOptions, children?: FilterPrimitive[]): FilterPrimitive;

				blurs: {
					blur1(): Filter;
					blur2(): Filter;
					blur4(): Filter;
					blur8(): Filter;
					glow(): Filter;
				};

				colors: {
					grayscale(): Filter;
					hueRotate60(): Filter;
					hueRotate120(): Filter;
					hueRotate180(): Filter;
					hueRotate270(): Filter;
					negate(): Filter;
					sepia(): Filter;
					showBlue(): Filter;
					showGreen(): Filter;
					showRed(): Filter;
				};

				convolutions: {
					allEdges3(): Filter;
					boxBlur3(): Filter;
					boxBlur5(): Filter;
					edgeEnhance(): Filter;
					horizontalEdges(): Filter;
					verticalEdges(): Filter;
				};

				miscs: {
					embossDropShadow(): Filter;
					embossDropShadowLight(): Filter;
					fuzzy(): Filter;
					holes(): Filter;
					holesComplement(): Filter;
					impressionist(): Filter;
					largeEmbossDropShadow(): Filter;
					largeEmbossDropShadowLight(): Filter;
					melting(): Filter;
					thinEmbossDropShadow(): Filter;
					thinEmbossDropShadowLight(): Filter;
					veryFuzzy(): Filter;
				};

				reliefs: {
					bumpIn(): Filter;
					bumpOut(): Filter;
					emboss(): Filter;
					largeEmboss(): Filter;
					thinEmboss(): Filter;
				};

				shadows: {
					dropShadow(): Filter;
					dropShadowLight(): Filter;
					fastDropShadow(): Filter;
					fastDropShadowLight(): Filter;
					fastSmallDropShadow(): Filter;
					smallDropShadow(): Filter;
					smallDropShadowLight(): Filter;
				};

				textures: {
					gold(): Filter;
					paper(): Filter;
					swirl(): Filter;
					swirl2(): Filter;
				};
			}
		}
	}
}

declare module 'dojox/gfx/filters' {
	const filters: dojox.gfx.filters.Filters;
	export = filters;
}
