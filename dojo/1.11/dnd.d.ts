declare namespace dojo {
	namespace dnd {

		/* implied types */

		interface DndLocation {
			t: number;
			l: number;
		}

		/* dojo/dnd/autoscroll */

		interface AutoScroll {
			getViewport(doc?: Document): DomGeometryBox;
			V_TRIGGER_AUTOSCROLL: number;
			H_TRIGGER_AUTOSCROLL: number;
			V_AUTOSCROLL_VALUE: number;
			H_AUTOSCROLL_VALUE: number;

			/**
			 * Called at the start of a drag.
			 */
			autoScrollStart(d: Document): void;

			/**
			 * a handler for mousemove and touchmove events, which scrolls the window, if
			 * necessary
			 */
			autoScroll(e: Event): void;

			_validNodes: { div: number; p: number; td: number; };
			_validOverflow: { auto: number; scroll: number; };

			/**
			 * a handler for mousemove and touchmove events, which scrolls the first available
			 * Dom element, it falls back to exports.autoScroll()
			 */
			autoScrollNodes(e: Event): void;
		}

		/* dojo/dnd/AutoSource */

		interface AutoSource extends Source { }

		interface AutoSourceConstructor {
			new (node: NodeOrString, params?: SourceArgs): AutoSource;
			prototype: AutoSource;
		}

		/* dojo/dnd/Avatar */

		interface Avatar {

			/**
			 * constructor function;
			 * it is separate so it can be (dynamically) overwritten in case of need
			 */
			construct(): void;

			/**
			 * destructor for the avatar; called to remove all references so it can be garbage-collected
			 */
			destroy(): void;

			/**
			 * updates the avatar to reflect the current DnD state
			 */
			update(): void;

			/**
			 * generates a proper text to reflect copying or moving of items
			 */
			_generateText(): string;

		}

		interface AvatarConstructor {
			new (manager: Manager): Avatar;
			prototype: Avatar;
		}

		/* dojo/dnd/common */

		interface Common {

			getCopyKeyState(evt: Event): boolean;

			_uniqueId: number;

			/**
			 * returns a unique string for use with any DOM element
			 */
			getUniqueId(): number;

			_empty: { };

			/**
			 * returns true if user clicked on a form element
			 */
			isFormElement(e: Event): boolean;
		}

		/* dojo/dnd/Container */

		interface ContainerItem<T extends GenericObject> {
			type?: string[];
			data?: T;
		}

		interface ContainerArgs {

			/**
			 * a creator function, which takes a data item, and returns an object like that:
			 * {node: newNode, data: usedData, type: arrayOfStrings}
			 */
			creator<T>(data?: ContainerItem<T>): { node: Element; data: T; type: string[]; };

			/**
			 * don't start the drag operation, if clicked on form elements
			 */
			skipForm: boolean;

			/**
			 * node or node's id to use as the parent node for dropped items
			 * (must be underneath the 'node' parameter in the DOM)
			 */
			dropParent: NodeOrString;

			/**
			 * skip startup(), which collects children, for deferred initialization
			 * (this is used in the markup mode)
			 */
			_skipStartup: boolean;
		}

		interface Container extends Evented {

			/**
			 * Indicates whether to allow dnd item nodes to be nested within other elements.
			 * By default this is false, indicating that only direct children of the container can
			 * be draggable dnd item nodes
			 */
			skipForm: boolean;

			/**
			 * Indicates whether to allow dnd item nodes to be nested within other elements.
			 * By default this is false, indicating that only direct children of the container can
			 * be draggable dnd item nodes
			 */
			allowNested: boolean;

			/**
			 * The DOM node the mouse is currently hovered over
			 */
			current: HTMLElement;

			/**
			 * Map from an item's id (which is also the DOMNode's id) to
			 * the dojo/dnd/Container.Item itself.
			 */
			map: { [name: string]: ContainerItem<any> };

			/**
			 * creator function, dummy at the moment
			 */
			creator<T>(data?: ContainerItem<T>): { node: Element; data: T; type: string[]; };

			/**
			 * returns a data item by its key (id)
			 */
			getItem<T>(key: string): ContainerItem<T>;

			/**
			 * associates a data item with its key (id)
			 */
			setITem<T>(key: string, data: ContainerItem<T>): void;

			/**
			 * removes a data item from the map by its key (id)
			 */
			delItem(key: string): void;

			/**
			 * iterates over a data map skipping members that
			 * are present in the empty object (IE and/or 3rd-party libraries).
			 */
			forInItems<T, U>(f: (i: ContainerItem<T>, idx?: number, container?: Container) => void, o?: U): U;

			/**
			 * removes all data items from the map
			 */
			clearItems(): void;

			/**
			 * returns a list (an array) of all valid child nodes
			 */
			getAllNodes(): NodeList<Node>;

			/**
			 * sync up the node list with the data map
			 */
			sync(): this;

			/**
			 * inserts an array of new nodes before/after an anchor node
			 */
			insertNodes(data: ContainerItem<any>[], before?: boolean, anchor?: Element): this;

			/**
			 * prepares this object to be garbage-collected
			 */
			destroy(): void;

			markupFactory<T>(params: ContainerArgs, node: Element, Ctor: GenericConstructor<T>): T;

			/**
			 * collects valid child items and populate the map
			 */
			startup(): void;

			/**
			 * event processor for onmouseover or touch, to mark that element as the current element
			 */
			onMouseOver(e: Event): void;

			/**
			 * event processor for onmouseout
			 */
			onMouseOut(e: Event): void;

			/**
			 * event processor for onselectevent and ondragevent
			 */
			onSelectStart(e: Event): void;

			/**
			 * this function is called once, when mouse is over our container
			 */
			onOverEvent(e: Event): void;

			/**
			 * this function is called once, when mouse is out of our container
			 */
			onOutEvent(e: Event): void;

			/**
			 * changes a named state to new state value
			 */
			_changeState(type: string, newState: string): void;

			/**
			 * adds a class with prefix "dojoDndItem"
			 */
			_addItemClass(node: Element, type: string): void;

			/**
			 * removes a class with prefix "dojoDndItem"
			 */
			_removeItemClass(node: Element, type: string): void;

			/**
			 * gets a child, which is under the mouse at the moment, or null
			 */
			_getChildByEvent(e: Event): void;

			/**
			 * adds all necessary data to the output of the user-supplied creator function
			 */
			_normalizedCreator<T>(item: ContainerItem<T>, hint: string): this;
		}

		interface ContainerConstructor {
			/**
			 * a constructor of the Container
			 */
			new (node: NodeOrString, params?: ContainerArgs): Container;
			prototype: Container;
		}

		interface Common {

			/**
			 * returns a function, which creates an element of given tag
			 * (SPAN by default) and sets its innerHTML to given text
			 */
			_createNode(tag: string): (text: string) => HTMLElement;

			/**
			 * creates a TR/TD structure with given text as an innerHTML of TD
			 */
			_createTrTd(text: string): HTMLTableRowElement;

			/**
			 * creates a SPAN element with given text as its innerHTML
			 */
			_createSpan(text: string): HTMLSpanElement;

			/**
			 * a dictionary that maps container tag names to child tag names
			 */
			_defaultCreatorNodes: { ul: string, ol: string, div: string, p: string };

			/**
			 * takes a parent node, and returns an appropriate creator function
			 */
			_defaultCreator<T>(node: HTMLElement): { node: HTMLElement; data: T; type: string };
		}

		/* dojo/dnd/Manager */

		interface Manager extends Evented {
			OFFSET_X: number;
			OFFSET_Y: number;

			overSource(source: Source): void;
			outSource(source: Source): void;
			startDrag(source: Source, nodes: HTMLElement[], copy?: boolean): void;
			canDrop(flag: boolean): void;
			stopDrag(): void;
			makeAvatar(): Avatar;
			updateAvatar(): void;
			onMouseMove(e: MouseEvent): void;
			onMouseUp(e: MouseEvent): void;
			onKeyDown(e: KeyboardEvent): void;
			onKeyUp(e: KeyboardEvent): void;
			_setCopyStatus(copy?: boolean): void;
		}

		interface ManagerConstructor {
			/**
			 * the manager of DnD operations (usually a singleton)
			 */
			new (): Manager;
			prototype: Manager;

			/**
			 * Returns the current DnD manager.  Creates one if it is not created yet.
			 */
			manager(): Manager;
		}

		interface Common {
			_manager: Manager;
		}

		/* dojo/dnd/move */

		interface Move {
			constrainedMoveable: ConstrainedMoveableConstructor;
			boxConstrainedMoveable: BoxConstrainedMoveableConstructor;
			parentConstrainedMoveable: ParentConstrainedMoveableConstructor;
		}

		interface ConstrainedMoveableArgs extends MoveableArgs {
			/**
			 * Calculates a constraint box.
			 * It is called in a context of the moveable object.
			 */
			constraints?: () => DomGeometryBox;

			/**
			 * restrict move within boundaries.
			 */
			within?: boolean;
		}

		interface ConstrainedMoveable extends Moveable {
			/**
			 * Calculates a constraint box.
			 * It is called in a context of the moveable object.
			 */
			constraints: () => DomGeometryBox;

			/**
			 * restrict move within boundaries.
			 */
			within: boolean;
		}

		interface ConstrainedMoveableConstructor {
			/**
			 * an object that makes a node moveable
			 */
			new (node: NodeOrString, params?: ConstrainedMoveableArgs): ConstrainedMoveable;
		}

		interface BoxConstrainedMoveableArgs extends ConstrainedMoveableArgs {
			/**
			 * a constraint box
			 */
			box?: DomGeometryBox;
		}

		interface BoxConstrainedMoveable extends ConstrainedMoveable {
			/**
			 * a constraint box
			 */
			box: DomGeometryBox;
		}

		interface BoxConstrainedMoveableConstructor {
			/**
			 * an object, which makes a node moveable
			 */
			new (node: NodeOrString, params?: BoxConstrainedMoveableArgs): BoxConstrainedMoveable;
		}

		type ConstraintArea = 'border' |  'content' | 'margin' | 'padding';

		interface ParentConstrainedMoveableArgs extends ConstrainedMoveableArgs {
			/**
			 * A parent's area to restrict the move.
			 * Can be "margin", "border", "padding", or "content".
			 */
			area?: ConstraintArea;
		}

		interface ParentConstrainedMoveable extends ConstrainedMoveable {
			/**
			 * A parent's area to restrict the move.
			 * Can be "margin", "border", "padding", or "content".
			 */
			area: ConstraintArea;
		}

		interface ParentConstrainedMoveableConstructor {
			/**
			 * an object, which makes a node moveable
			 */
			new (node: NodeOrString, params?: ParentConstrainedMoveableArgs): ParentConstrainedMoveable;
		}

		/* dojo/dnd/Moveable */

		interface MoveableArgs {
			/**
			 * A node (or node's id), which is used as a mouse handle.
			 * If omitted, the node itself is used as a handle.
			 */
			handle?: NodeOrString;

			/**
			 * delay move by this number of pixels
			 */
			delay?: number;

			/**
			 * skip move of form elements
			 */
			skip?: boolean;

			/**
			 * a constructor of custom Mover
			 */
			mover?: MoverConstructor;
		}

		interface Moveable {
			/**
			 * markup methods
			 */
			markupFactory<T>(params: MoveableArgs, node: HTMLElement, Ctor: GenericConstructor<T>): T;

			/**
			 * stops watching for possible move, deletes all references, so the object can be garbage-collected
			 */
			destroy(): void;

			/**
			 * event processor for onmousedown/ontouchstart, creates a Mover for the node
			 */
			onMouseDown(e: MouseEvent): void;

			/**
			 * event processor for onmousemove/ontouchmove, used only for delayed drags
			 */
			onMouseMove(e: MouseEvent): void;

			/**
			 * event processor for onmouseup, used only for delayed drags
			 */
			onMouseUp(e: MouseEvent): void;

			/**
			 * called when the drag is detected;
			 * responsible for creation of the mover
			 */
			onDragDetected(e: Event): void;

			/**
			 * called before every move operation
			 */
			onMoveStart(mover: Mover): void;

			/**
			 * called after every move operation
			 */
			onMoveStop(mover: Mover): void;

			/**
			 * called during the very first move notification;
			 * can be used to initialize coordinates, can be overwritten.
			 */
			onFirstMove(mover: Mover, e: Event): void;

			/**
			 * called during every move notification;
			 * should actually move the node; can be overwritten.
			 */
			onMove(mover: Mover, leftTop: DndLocation, e?: Event): void;

			/**
			 * called before every incremental move; can be overwritten.
			 */
			onMoving(mover: Mover, leftTop: DndLocation): void;

			/**
			 * called after every incremental move; can be overwritten.
			 */
			onMoved(mover: Mover, leftTop: DndLocation): void;
		}

		interface MoveableConstructor {
			new (node: NodeOrString, params?: MoveableArgs): Moveable;
			prototype: Moveable;
		}

		/* dojo/dnd/Mover */

		interface MoverHost extends GenericObject {
			onMoveStart(mover: Mover): void;
			onMoveStop(mover: Mover): void;
		}

		interface Mover extends Evented {
			/**
			 * event processor for onmousemove/ontouchmove
			 */
			onMouseMove(e: MouseEvent): void;

			onMouseUp(e: MouseEvent): void;

			/**
			 * makes the node absolute; it is meant to be called only once.
			 * relative and absolutely positioned nodes are assumed to use pixel units
			 */
			onFirstMove(e: Event): void;

			/**
			 * stops the move, deletes all references, so the object can be garbage-collected
			 */
			destroy(): void;
		}

		interface MoverConstructor {
			/**
			 * an object which makes a node follow the mouse, or touch-drag on touch devices.
			 * Used as a default mover, and as a base class for custom movers.
			 */
			new (node: HTMLElement, e: MouseEvent, host: MoverHost): Mover;
			prototype: Mover;
		}

		/* dojo/dnd/Selector */

		interface Selector extends Container {

			/**
			 * The set of id's that are currently selected, such that this.selection[id] == 1
			 * if the node w/that id is selected.  Can iterate over selected node's id's like:
			 *     for(var id in this.selection)
			 */
			selection: { [id: string]: number };

			/**
			 * is singular property
			 */
			singular: boolean;

			/**
			 * returns a list (an array) of selected nodes
			 */
			getSelectedNodes(): NodeList<Node>;

			/**
			 * unselects all items
			 */
			selectNone(): this;

			/**
			 * selects all items
			 */
			selectAll(): this;

			/**
			 * deletes all selected items
			 */
			deleteSelectedNodes(): this;

			/**
			 * iterates over selected items;
			 * see `dojo/dnd/Container.forInItems()` for details
			 */
			forInSelectedItems<T>(f: (i: ContainerItem<T>, idx?: number, container?: Container) => void, o?: GenericObject): void;

			/**
			 * event processor for onmousemove
			 */
			onMouseMove(e: Event): void;

			/**
			 * this function is called once, when mouse is over our container
			 */
			onOverEvent(): void;

			/**
			 * this function is called once, when mouse is out of our container
			 */
			onOutEvent(): void;

			/**
			 * unselects all items
			 */
			_removeSelection(): this;

			_removeAnchor(): this;
		}

		interface SelectorConstructor {
			/**
			 * constructor of the Selector
			 */
			new (node: NodeOrString, params?: ContainerArgs): Selector;
			prototype: Selector;
		}

		/* dojo/dnd/Source */

		/**
		 * a dict of parameters for DnD Source configuration. Note that any
		 * property on Source elements may be configured, but this is the
		 * short-list
		 */
		interface SourceArgs {
			[arg: string]: any;

			/**
			 * can be used as a DnD source. Defaults to true.
			 */
			isSource?: boolean;

			/**
			 * list of accepted types (text strings) for a target; defaults to
			 * ["text"]
			 */
			accept?: string[];

			/**
			 * if true refreshes the node list on every operation; false by default
			 */
			autoSync?: boolean;

			/**
			 * copy items, if true, use a state of Ctrl key otherwisto
			 * see selfCopy and selfAccept for more details
			 */
			copyOnly?: boolean;

			/**
			 * the move delay in pixels before detecting a drag; 0 by default
			 */
			delay?: number;

			/**
			 * a horizontal container, if true, vertical otherwise or when omitted
			 */
			horizontal?: boolean;

			/**
			 * copy items by default when dropping on itself,
			 * false by default, works only if copyOnly is true
			 */
			selfCopy?: boolean;

			/**
			 * accept its own items when copyOnly is true,
			 * true by default, works only if copyOnly is true
			 */
			selfAccept?: boolean;

			/**
			 * allows dragging only by handles, false by default
			 */
			withHandles?: boolean;

			/**
			 * generate text node for drag and drop, true by default
			 */
			generateText?: boolean;
		}

		interface Source extends Selector {

			/**
			 * checks if the target can accept nodes from this source
			 */
			checkAcceptance(source: Container, nodes: HTMLElement[]): boolean;

			/**
			 * Returns true if we need to copy items, false to move.
			 * It is separated to be overwritten dynamically, if needed.
			 */
			copyState(keyPressed: boolean, self?: boolean): boolean;

			/**
			 * topic event processor for /dnd/source/over, called when detected a current source
			 */
			onDndSourceOver(source: Container): void;

			/**
			 * topic event processor for /dnd/start, called to initiate the DnD operation
			 */
			onDndStart(source: Container, nodes: HTMLElement[], copy?: boolean): void;

			/**
			 * topic event processor for /dnd/drop, called to finish the DnD operation
			 */
			onDndDrop(source: Container, nodes: HTMLElement[], copy: boolean, target: Container): void;

			/**
			 * topic event processor for /dnd/cancel, called to cancel the DnD operation
			 */
			onDndCancel(): void;

			/**
			 * called only on the current target, when drop is performed
			 */
			onDrop(source: Container, nodes: HTMLElement[], copy?: boolean): void;

			/**
			 * called only on the current target, when drop is performed
			 * from an external source
			 */
			onDropExternal(source: Container, nodes: HTMLElement[], copy?: boolean): void;

			/**
			 * called only on the current target, when drop is performed
			 * from the same target/source
			 */
			onDropInternal(nodes: HTMLElement[], copy?: boolean): void;

			/**
			 * called during the active DnD operation, when items
			 * are dragged over this target, and it is not disabled
			 */
			onDraggingOver(): void;

			/**
			 * called during the active DnD operation, when items
			 * are dragged away from this target, and it is not disabled
			 */
			onDraggingOut(): void;

			/**
			 * this function is called once, when mouse is over our container
			 */
			onOverEvent(): void;

			/**
			 * this function is called once, when mouse is out of our container
			 */
			onOutEvent(): void;

			/**
			 * assigns a class to the current target anchor based on "before" status
			 */
			_markTargetAnchor(before?: boolean): void;

			/**
			 * removes a class of the current target anchor based on "before" status
			 */
			_unmarkTargetAnchor(): void;

			/**
			 * changes source's state based on "copy" status
			 */
			_markDndStatus(copy?: boolean): void;

			/**
			 * checks if user clicked on "approved" items
			 */
			_legalMouseDown(e?: Event): boolean;
		}

		interface SourceConstructor {
			new (node: NodeOrString, params?: SourceArgs): Source;
			prototype: Source;
		}

		/* dojo/dnd/Target */

		interface Target extends Source { }

		interface TargetConstructor {
			new (node: HTMLElement, params: SourceArgs): Target;
			prototype: Target;
		}

		/* dojo/dnd/TimedMoveable */

		interface TimedMoveableArgs extends MoveableArgs {
			timeout?: number;
		}

		interface TimedMoveable extends Moveable {
			onMoveStop(mover: Mover): void;
			onMove(mover: Mover, leftTop: DndLocation): void;
		}

		interface TimedMoveableConstructor {
			new (node: HTMLElement, params?: TimedMoveableArgs): TimedMoveable;
			prototype: TimedMoveable;
		}
	}
}
