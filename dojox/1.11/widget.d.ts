declare namespace dojox {
	namespace widget {

		/* dojox/widget/DialogSimple */

		interface DialogSimple extends dijit.layout.ContentPane, dijit._DialogMixin {
			// summary:
			//        A Simple Dialog Mixing the `dojox.layout.ContentPane` functionality over
			//        top of a vanilla `dijit.Dialog`. See `dojox.widget.Dialog` for a more flexible
			//        dialog option allowing animations and different styles/theme support.
		}

		interface DialogSimpleConstructor extends dijit._WidgetBaseConstructor<DialogSimple> { }

		/* dojox/widget/Dialog */

		interface Dialog extends DialogSimple {
			// sizeToViewport: Boolean
			//        If true, fix the size of the dialog to the Viewport based on
			//        viewportPadding value rather than the calculated or natural
			//        style. If false, base the size on a passed dimension attribute.
			//        Either way, the viewportPadding value is used if the the content
			//        extends beyond the viewport size for whatever reason.
			sizeToViewport: boolean;

			// viewportPadding: Integer
			//        If sizeToViewport="true", this is the amount of padding in pixels to leave
			//        between the dialog border and the viewport edge.
			//        This value is also used when sizeToViewport="false" and dimensions exceeded
			//        by dialog content to ensure dialog does not go outside viewport boundary
			viewportPadding: number;

			// dimensions: Array
			//        A two-element array of [width,height] to animate the Dialog to if sizeToViewport="false"
			//        Defaults to [300,300]
			dimensions: number[];

			// easing: Function?|String?
			//        An easing function to apply to the sizing animation.
			easing: Function | string;

			// sizeDuration: Integer
			//        Time (in ms) to use in the Animation for sizing.
			sizeDuration: number;

			// sizeMethod: String
			//        To be passed to dojox.fx.sizeTo, one of "chain" or "combine" to effect
			//        the animation sequence.
			sizeMethod: string;

			// showTitle: Boolean
			//        Toogle to show or hide the Title area. Can only be set at startup.
			showTitle: boolean;

			// draggable: Boolean
			//        Make the pane draggable. Differs from dijit.Dialog by setting default to false
			draggable: boolean;

			// modal: Boolean
			//        If true, this Dialog instance will be truly modal and prevent closing until
			//        explicitly told to by calling hide() - Defaults to false to preserve previous
			//        behaviors.
			modal: boolean;
		}

		interface DialogConstructor extends dijit._WidgetBaseConstructor<Dialog> { }

		/* dojox/widget/Toaster */

		interface ToasterMessageTypes {
			MESSAGE: string;
			WARNING: string;
			ERROR: string;
			FATAL: string;
		}

		interface Toaster extends dijit._WidgetBase, dijit._TemplatedMixin {
			// messageTopic: String
			//        Name of topic; anything published to this topic will be displayed as a message.
			//        Message format is either String or an object like
			//        {message: "hello word", type: "error", duration: 500}
			messageTopic: string;

			// messageTypes: Enumeration
			//        Possible message types.
			messageTypes: ToasterMessageTypes;

			// defaultType: String
			//        If message type isn't specified (see "messageTopic" parameter),
			//        then display message as this type.
			//        Possible values in messageTypes enumeration ("message", "warning", "error", "fatal")
			defaultType: string;

			// positionDirection: String
			//        Position from which message slides into screen, one of
			//        ["br-up", "br-left", "bl-up", "bl-right", "tr-down", "tr-left", "tl-down", "tl-right"]
			positionDirection: string;

			// positionDirectionTypes: Array
			//        Possible values for positionDirection parameter
			positionDirectionTypes: string[];

			// duration: Integer
			//        Number of milliseconds to show message
			duration: number;

			// slideDuration: Integer
			//        Number of milliseconds for the slide animation, increasing will cause the Toaster
			//        to slide in more slowly.
			slideDuration: number;

			// separator: String
			//        String used to separate messages if consecutive calls are made to setContent before previous messages go away
			separator: string;

			setContent(message: string | Function, messageType: string, duration?: number): void;
			onSelect(e: Event): void;
			hide(): void;
			show(): void;
		}

		interface ToasterConstructor extends dijit._WidgetBaseConstructor<Toaster> {}

		interface Standby extends dijit._Widget, dijit._TemplatedMixin {

			/**
			 * Property to define if the image and its alt text should be used, or a simple Text/HTML noe should be used.
			 */
			centerIndicator: string;

			/**
			 * The color to set the overlay.
			 */
			color: string;

			/**
			 * Integer defining how long the show and hide effects should take in milliseconds.
			 */
			duration: number;

			/**
			 * A URL to an image to center within the blocking overlay.
			 */
			image: string;

			/**
			 * Text to set on the ALT tag of the image.
			 */
			imageText: string;

			/**
			 * The opacity to make the overlay when it is displayed/faded in.
			 */
			opacity: number;

			/**
			 * The target to overlay when active.
			 */
			target: string;

			/**
			 * The template string defining out the basics of the widget.
			 */
			templateString: string;

			/**
			 * Text/HTML to display in the center of the overlay This is used if image center is disabled.
			 */
			text: string;

			/**
			 * Control that lets you specify if the zIndex for the overlay shold be auto-computed based off parent zIndex, or should be set to a particular value.
			 */
			zIndex: string;

			/**
			 * Function to hide the blocking overlay and status icon or text.
			 */
			hide(): void;

			/**
			 * Helper function so you can test if the widget is already visible or not.
			 */
			isVisible(): boolean;

			/**
			 * Function to display the blocking overlay and busy/status icon or text.
			 */
			show(): void;

			/**
			 * Over-ride of the basic widget startup function.
			 * @param args
			 */
			startup(): void;

			/**
			 * Over-ride to hide the widget, which clears intervals, before cleanup.
			 */
			uninitialize(): boolean;

			/**
			 * Event that fires when the display of the Standby completes.
			 */
			onHide(): void;

			/**
			 * Event that fires when the display of the Standby completes.
			 */
			onShow(): void;
		}

		interface StandbyConstructor extends dijit._WidgetBaseConstructor<Standby> { }
	}
}
