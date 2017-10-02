/// <reference path="../../dstore/1.1/dstore.d.ts" />

declare module dgrid {
	export interface Constructor<T, U> extends dojo._base.DeclareConstructor<T> {
		new (kwArgs?: U, srcNodeRef?: HTMLElement | string): T;

		createSubclass<T1, U1, T2, U2, T3, U3, T4, U4, X>(mixins: [Constructor<T1, U1>, Constructor<T2, U2>, Constructor<T3, U3>, Constructor<T4, U4>], props: X): Constructor<T & T1 & T2 & T3 & T4 & X, U & U1 & U2 & U3 & T4>;
		createSubclass<T1, U1, T2, U2, T3, U3, X>(mixins: [Constructor<T1, U1>, Constructor<T2, U2>, Constructor<T3, U3>], props: X): Constructor<T & T1 & T2 & T3 & X, U & U1 & U2 & U3>;
		createSubclass<T1, U1, T2, U2, X>(mixins: [Constructor<T1, U1>, Constructor<T2, U2>], props: X): Constructor<T & T1 & T2 & X, U & U1 & U2>;
		createSubclass<T1, U1, X>(mixins: [Constructor<T1, U1>], props: X): Constructor<T & T1 & X, U & U1>;
		createSubclass<T1, U1, X>(mixins: Constructor<T1, U1>, props: X): Constructor<T & T1 & X, U & U1>;
		createSubclass<T1, U1, T2, U2, T3, U3, T4, U4>(mixins: [Constructor<T1, U1>, Constructor<T2, U2>, Constructor<T3, U3>, Constructor<T4, U4>]): Constructor<T & T1 & T2 & T3 & T4, U & U1 & U2 & U3 & T4>;
		createSubclass<T1, U1, T2, U2, T3, U3>(mixins: [Constructor<T1, U1>, Constructor<T2, U2>, Constructor<T3, U3>]): Constructor<T & T1 & T2 & T3, U & U1 & U2 & U3>;
		createSubclass<T1, U1, T2, U2>(mixins: [Constructor<T1, U1>, Constructor<T2, U2>]): Constructor<T & T1 & T2, U & U1 & U2>;
		createSubclass<T1, U1>(mixins: [Constructor<T1, U1>]): Constructor<T & T1, U & U1>;
		createSubclass<T1, U1>(mixins: Constructor<T1, U1>): Constructor<T & T1, U & U1>;
		createSubclass<X>(mixins: any, props: X): Constructor<T & X, U>;
	}
}

declare module 'dgrid/CellSelection' {
	import Selection = require('dgrid/Selection');
	import Grid = require('dgrid/Grid');

	interface CellSelection extends Selection {
		isSelected(target: Grid.CellArg, columnId?: string): boolean;
		clearSelection(): void;
	}

	interface CellSelectionConstructor extends dgrid.Constructor<CellSelection, Selection.KwArgs> {}

	const CellSelection: CellSelectionConstructor;

	export = CellSelection;
}

declare module 'dgrid/ColumnSet' {
	import Grid = require('dgrid/Grid');

	interface ColumnSet {
		styleColumnSet(columnsetId: string, css: string): dojo.Handle;
	}

	module ColumnSet {
		export interface KwArgs extends Grid.KwArgs {
			columnSets?: Array<Array<Grid.Column>>;
		}
	}

	interface ColumnSetConstructor extends dgrid.Constructor<ColumnSet, ColumnSet.KwArgs> {}

	const ColumnSet: ColumnSetConstructor;

	export = ColumnSet;
}

declare module 'dgrid/Editor' {
	import Grid = require('dgrid/Grid');
	import OnDemandGrid = require('dgrid/OnDemandGrid');

	interface Editor {
		edit(cell: Grid.Cell<any> | HTMLElement | Event): void;
	}

	module Editor {
		export interface Column extends Grid.Column {
			autoSave?: boolean;
			autoSelect?: boolean;
			dismissOnEnter?: boolean;
			editor?: string | dojo._base.DeclareConstructor<any>;
			editOn?: string;
			editorArgs?: Object;

			canEdit?(object: any, value: any): boolean;
		}
		export type ColumnSpec = { [key: string]: Column | string; } | Column[];
		export interface KwArgs extends OnDemandGrid.KwArgs {
			columns?: ColumnSpec;
			subRows?: Array<Column[]>;
		}
	}

	interface EditorConstructor extends dgrid.Constructor<Editor, Editor.KwArgs> {}

	const Editor: EditorConstructor;

	export = Editor;
}

declare module 'dgrid/Grid' {
	import List = require('dgrid/List');

	interface Grid extends List {
		columns: { [ key: string ]: Grid.Column };
		hasNeutralSort: boolean;
		cellNavigation: boolean;
		formatterScope: any;

		column(target: any): Grid.Column;
		cell(target: Grid.CellArg, columnId?: string): Grid.Cell<any>;
		left(target: Grid.Cell<any> | Grid.CellArg, steps?: number): Grid.Cell<any>;
		right(target: Grid.Cell<any> | Grid.CellArg, steps?: number): Grid.Cell<any>;
		styleColumn(columnId: string, css: string): dojo.Handle;
		updateSortArrow(sort: any, updateSort?: boolean): void;
	}

	module Grid {
		export type CellArg = List.RowArg;
		export interface Cell<T> {
			row: List.Row<T>;
			column: Column;
			element: HTMLElement;
		}
		export interface Column {
			field?: string;
			id?: string | number;
			label?: string;
			className?: string;
			colSpan?: number;
			rowSpan?: number;
			sortable?: boolean;
			formatter?: string | Formatter;

			get?(item: any): any;
			set?(item: any): any;
			renderCell?(object: any, value: any, node: HTMLElement): (HTMLElement | void);
			renderHeaderCell?(node: HTMLElement): (HTMLElement | void);
		}
		export type ColumnSpec = { [key: string]: Column | string; } | Column[];
		export type Formatter = (value: any, object: any) => string;
		export interface KwArgs extends List.KwArgs {
			columns?: ColumnSpec;
			subRows?: Array<Column[]>;
			formatterScope?: any;
			hasNeutralSort?: boolean;
			cellNavigation?: boolean;
		}
	}

	interface GridConstructor extends dgrid.Constructor<Grid, Grid.KwArgs> {
		appendIfNode(parent: HTMLElement, subNode?: any): void;
	}

	const Grid: GridConstructor;

	export = Grid;
}

declare module 'dgrid/GridFromHtml' {
	import Grid = require('dgrid/Grid');

	interface GridFromHtml extends Grid {}

	interface GridFromHtmlConstructor extends dgrid.Constructor<GridFromHtml, Grid.KwArgs> {
		utils: {
			getBoolFromAttr(node: Node, attr: string): boolean;
			getNumFromAttr(node: Node, attr: string): number;
			getPropsFromNode(node: Node): any;
			getColumnFromCell(node: Node): Grid.Column;
		};
	}

	const GridFromHtml: GridFromHtmlConstructor;

	export = GridFromHtml;
}

declare module 'dgrid/GridWithColumnSetsFromHtml' {
	import Grid = require('dgrid/Grid');
	import GridFromHtml = require('dgrid/GridFromHtml');
	import ColumnSet = require('dgrid/ColumnSet');

	interface GridWithColumnSetsFromHtml extends GridFromHtml, ColumnSet {}

	module GridWithColumnSetsFromHtml {
		export interface KwArgs extends Grid.KwArgs, ColumnSet.KwArgs {}
	}

	interface GridWithColumnSetsFromHtmlConstructor extends dgrid.Constructor<GridWithColumnSetsFromHtml, GridWithColumnSetsFromHtml.KwArgs> {}

	const GridWithColumnSetsFromHtml: GridWithColumnSetsFromHtmlConstructor;

	export = GridWithColumnSetsFromHtml;
}

declare module 'dgrid/Keyboard' {
	interface Keyboard {
		cellNavigation: boolean;
		pageSkip: number;
		keyMap: Keyboard.KeyMap;
		headerKeyMap: Keyboard.KeyMap;

		addKeyHandler(key: number, callback: Function, isHeader?: boolean): dojo.Handle;
		focus(target: any): void;
		focusHeader(target: any): void;
	}

	module Keyboard {
		export interface KeyMap {
			[ key: number ]: Function;
		}

		export interface KwArgs {
			cellNavigation?: boolean;
			pageSkip?: number;
			keyMap?: KeyMap;
			headerKeyMap?: KeyMap;
		}
	}

	interface KeyboardConstructor extends dgrid.Constructor<Keyboard, Keyboard.KwArgs> {
		defaultHeaderKeyMap: Keyboard.KeyMap;
		defaultKeyMap: Keyboard.KeyMap;

		moveFocusVertical: (event: KeyboardEvent, steps: number) => void;
	}

	const Keyboard: KeyboardConstructor;

	export = Keyboard;
}

declare module 'dgrid/List' {
	interface List {
		readonly domNode: HTMLElement;

		tabableHeader: boolean;
		showHeader: boolean;
		showFooter: boolean;
		maintainOddEven: boolean;
		cleanAddedRules: boolean;
		addUiClasses: boolean;
		highlightDuration: number;
		resizeThrottleDelay: number;
		resizeThrottleMethod: List.ThrottleMethod;
		sort: any;

		create(params: any, srcNodeRef?: HTMLElement): void;
		buildRendering(): void;
		postCreate(): void;

		get(key: string): any;

		set(key: string, value: any): this;
		set(kwArgs: any): this;

		addCssRule(selector: string, css: string): dojo.Handle;
		adjustRowIndices(firstRow: HTMLElement): void;
		cleanup(): void;
		configStructure(): void;
		destroy(): void;
		down(row: List.Row<any> | List.RowArg, steps?: number): List.Row<any>;
		getScrollPosition(): { x: number; y: number; };
		highlightRow(rowElement: HTMLElement | List.Row<any>, delay?: number): void;
		insertRow(object: any, parent: HTMLElement, beforeNode: Node, i: number, options?: any): HTMLElement;

		on(type: string | dojo.ExtensionEvent, listener: EventListener): dojo.Handle;

		_onNotification(rows?: any[], object?: any, from?: number, to?: number): void;
		refresh(): void;
		removeRow(rowElement: any, preserveDom?: boolean): void;
		renderArray(results: any[], beforeNode?: Node, options?: any): HTMLElement;
		renderHeader(): void;
		renderRow(value: any, options?: Object): HTMLElement;

		row(target: List.RowArg): List.Row<any>;
		resize(): void;
		scrollTo(options: { x?: number; y?: number; }): void;
		startup(): void;
		up(row: List.Row<any> | List.RowArg, steps?: number): List.Row<any>;
	}

	module List {
		export type RowArg = Event | HTMLElement | Object | string | number;
		export interface Row<T> {
			id: string;
			data: T;
			element: HTMLElement;

			remove(): void;
		}

		export interface KwArgs {
			tabableHeader?: boolean;
			showHeader?: boolean;
			showFooter?: boolean;
			maintainOddEven?: boolean;
			cleanAddedRules?: boolean;
			addUiClasses?: boolean;
			highlightDuration?: number;
			resizeThrottleDelay?: number;
			resizeThrottleMethod?: ThrottleMethod;
			sort?: any;
		}

		export type ThrottleFunction = (callback: Function, delay: number) => Function;
		export type ThrottleMethod = 'debounce' | 'throttle' | 'throttleDelayed' | ThrottleFunction;
	}

	interface ListConstructor extends dgrid.Constructor<List, List.KwArgs> {}

	const List: ListConstructor;

	export = List;
}

declare module 'dgrid/OnDemandGrid' {
	import Grid = require('dgrid/Grid');
	import OnDemandList = require('dgrid/OnDemandList');

	interface OnDemandGrid extends Grid, OnDemandList {
		refresh(options?: any): dojo.promise.Promise<any[]>;
	}

	module OnDemandGrid {
		export interface KwArgs extends Grid.KwArgs, OnDemandList.KwArgs {}
	}

	interface OnDemandGridConstructor extends dgrid.Constructor<OnDemandGrid, OnDemandGrid.KwArgs> {}

	const OnDemandGrid: OnDemandGridConstructor;
	export = OnDemandGrid;
}

declare module 'dgrid/OnDemandList' {
	import List = require('dgrid/List');
	import StoreMixin = require('dgrid/_StoreMixin');

	interface OnDemandList extends List, StoreMixin {
		refresh(options?: any): dojo.promise.Promise<any[]>;
	}

	module OnDemandList {
		export interface KwArgs extends List.KwArgs, StoreMixin.KwArgs {
			minRowsPerPage?: number;
			maxRowsPerPage?: number;
			maxEmptySpace?: number;
			bufferRows?: number;
			farOffRemoval?: number;
			queryRowsOverlap?: number;
			pagingMethod?: string;
			pagingDelay?: number;
			keepScrollPosition?: boolean;
			rowHeight?: number;
		}
	}

	interface OnDemandListConstructor extends dgrid.Constructor<OnDemandList, OnDemandList.KwArgs> {}

	const OnDemandList: OnDemandListConstructor;

	export = OnDemandList;
}

declare module 'dgrid/Selection' {
	import List = require('dgrid/List');

	interface Selection {
		selectionMode: Selection.Mode;
		selection: { [key: string]: boolean; };

		select(row: List.Row<any> | List.RowArg, toRow?: List.Row<any> | List.RowArg, value?: boolean): void;
		deselect(row: List.Row<any> | List.RowArg, toRow?: List.Row<any> | List.RowArg): void;
		clearSelection(exceptId?: any, dontResetLastSelected?: boolean): void;
		selectAll(): void;
		isSelected(row: List.Row<any> | List.RowArg): boolean;
	}

	module Selection {
		export type Mode = 'none' | 'multiple' | 'single' | 'extended';
		export interface KwArgs {
			selectionDelegate?: string;
			selectionEvents?: string;
			selectionTouchEvents?: string;
			deselectOnRefresh?: boolean;
			allowSelectAll?: boolean;
			selectionMode?: Mode;
			allowTextSelection?: boolean;
		}
	}

	interface SelectionConstructor extends dgrid.Constructor<Selection, Selection.KwArgs> {}

	const Selection: SelectionConstructor;

	export = Selection;
}

declare module 'dgrid/Selector' {
	import Selection = require('dgrid/Selection');

	export = Selection;
}

declare module 'dgrid/_StoreMixin' {
	interface StoreMixin {
		get(key: string): any;

		revert(): void;
		save(): dojo.promise.Promise<{ [ key: string ]: any; }>;
		updateDirty(id: string, field: string, value: any): void;
	}

	module StoreMixin {
		export interface KwArgs {
			collection?: dstore.Collection<any>;
			shouldTrackCollection?: boolean;
			getBeforePut?: boolean;
			noDataMessage?: string;
			loadingMessage?: string;
		}
	}

	interface StoreMixinConstructor extends dgrid.Constructor<StoreMixin, StoreMixin.KwArgs> {}

	const StoreMixin: StoreMixinConstructor;

	export = StoreMixin;
}

declare module 'dgrid/Tree' {
	import List = require('dgrid/List');
	import Grid = require('dgrid/Grid');

	interface Tree {
		expand(target: List.Row<any> | List.RowArg, expand?: boolean): dojo.promise.Promise<any>;
		shouldExpand(row: List.Row<any>, level: number, previouslyExpanded: boolean): boolean;
	}

	module Tree {
		export interface Column extends Grid.Column {
			expandOn?: string;
			renderExpando?: boolean | RenderExpando;
		}
		export type ColumnSpec = { [key: string]: Column | string; } | Column[];
		export interface KwArgs extends Grid.KwArgs {
			columns?: ColumnSpec;
			subRows?: Array<Column[]>;
			collapseOnRefresh?: boolean;
			enableTreeTransitions?: boolean;
			treeIndentWidth?: number;
		}
		export type RenderExpando = (level: number, mayHaveChildren: boolean, expanded: boolean, item: any) => HTMLElement;
	}

	interface TreeConstructor extends dgrid.Constructor<Tree, Tree.KwArgs> {}

	const Tree: TreeConstructor;

	export = Tree;
}

declare module 'dgrid/extensions/ColumnHider' {
	import List = require('dgrid/List');
	import Grid = require('dgrid/Grid');

	interface ColumnHider {
		columns: { [ key: string ]: ColumnHider.Column };

		column(target: any): ColumnHider.Column;
		cell(target: Grid.CellArg, columnId?: string): ColumnHider.Cell<any>;
		left(target: ColumnHider.Cell<any> | Grid.CellArg, steps?: number): ColumnHider.Cell<any>;
		right(target: ColumnHider.Cell<any> | Grid.CellArg, steps?: number): ColumnHider.Cell<any>;

		toggleColumnHiddenState(id: string, hidden?: boolean): void;
	}

	module ColumnHider {
		export interface Cell<T> {
			row: List.Row<T>;
			column: Column;
			element: HTMLElement;
		}
		export interface Column extends Grid.Column {
			hidden?: boolean;
			unhidable?: boolean;
		}
		export type ColumnSpec = { [key: string]: Column | string; } | Column[];
		export interface KwArgs extends Grid.KwArgs {
			columns?: ColumnSpec;
		}
	}

	interface ColumnHiderConstructor extends dgrid.Constructor<ColumnHider, ColumnHider.KwArgs> {}

	const ColumnHider: ColumnHiderConstructor;

	export = ColumnHider;
}

declare module 'dgrid/extensions/ColumnReorder' {
	import List = require('dgrid/List');
	import Grid = require('dgrid/Grid');

	interface ColumnReorder {
		columnDndConstructor: Function;
	}

	module ColumnReorder {
		export interface ColumnDndSource extends dojo.dnd.Source {}
		export interface ColumnDndSourceConstructor extends dojo._base.DeclareConstructor<ColumnDndSource> {}

		export interface Cell<T> {
			row: List.Row<T>;
			column: Column;
			element: HTMLElement;
		}
		export interface Column extends Grid.Column {
			reorderable?: boolean;
		}
		export type ColumnSpec = { [key: string]: Column | string; } | Column[];
		export interface KwArgs extends Grid.KwArgs {
			columnDndConstructor?: Function;
			columns?: ColumnSpec;
			subRows?: Array<Column[]>;
		}
	}

	interface ColumnReorderConstructor extends dgrid.Constructor<ColumnReorder, ColumnReorder.KwArgs> {
		ColumnDndSource: ColumnReorder.ColumnDndSourceConstructor;
	}

	const ColumnReorder: ColumnReorderConstructor;

	export = ColumnReorder;
}

declare module 'dgrid/extensions/ColumnResizer' {
	import List = require('dgrid/List');
	import Grid = require('dgrid/Grid');

	interface ColumnResizer {
		adjustLastColumn: boolean;
		minWidth: number;

		resizeColumnWidth(columnId: string, width: number): void;
	}

	module ColumnResizer {
		export interface Cell<T> {
			row: List.Row<T>;
			column: Column;
			element: HTMLElement;
		}
		export interface Column extends Grid.Column {
			resizable?: boolean;
			width?: number;
		}
		export type ColumnSpec = { [key: string]: Column | string; } | Column[];
		export interface KwArgs extends Grid.KwArgs {
			adjustLastColumn?: boolean;
			minWidth?: number;
			columns?: ColumnSpec;
			subRows?: Array<Column[]>;
		}
	}
	interface ColumnResizerConstructor extends dgrid.Constructor<ColumnResizer, ColumnResizer.KwArgs> {}

	const ColumnResizer: ColumnResizerConstructor;

	export = ColumnResizer;
}

declare module 'dgrid/extensions/CompoundColumns' {
	import List = require('dgrid/List');
	import Grid = require('dgrid/Grid');

	interface CompoundColumns {
		adjustLastColumn: boolean;
		minWidth: number;

		resizeColumnWidth(columnId: string, width: number): void;
	}

	module CompoundColumns {
		export interface Cell<T> {
			row: List.Row<T>;
			column: Column;
			element: HTMLElement;
		}
		export interface Column extends Grid.Column {
			children?: Column[];
			showChildHeaders?: boolean;
		}
		export type ColumnSpec = { [key: string]: Column | string; } | Column[];
		export interface KwArgs extends Grid.KwArgs {
			adjustLastColumn?: boolean;
			minWidth?: number;
			columns?: ColumnSpec;
			subRows?: Array<Column[]>;
		}
	}

	interface CompoundColumnsConstructor extends dgrid.Constructor<CompoundColumns, CompoundColumns.KwArgs> {}

	const CompoundColumns: CompoundColumnsConstructor;

	export = CompoundColumns;
}

declare module 'dgrid/extensions/DijitRegistry' {
	interface DijitRegistry {
		minSize: number;
		maxSize: number;
		layoutPriority: number;
		showTitle: boolean;

		buildRendering(): void;
		destroyRecursive(): void;
		getChildren(): any[];
		getParent(): any;
		isLeftToRight(): boolean;
		placeAt(reference: any, position?: string | number): any;
		resize(dim?: dojo.DomGeometryWidthHeight): void;
		watch(...args: any[]): void;
	}

	module DijitRegistry {
		export interface KwArgs {
			minSize?: number;
			maxSize?: number;
			layoutPriority?: number;
			showTitle?: boolean;
		}
	}

	interface DijitRegistryConstructor extends dgrid.Constructor<DijitRegistry, DijitRegistry.KwArgs> {}

	const DijitRegistry: DijitRegistryConstructor;

	export = DijitRegistry;
}

declare module 'dgrid/extensions/DnD' {
	import List = require('dgrid/List');

	interface Dnd {
		dndSourceType: string;
		dndParams: any;
		dndConstructor: Function;
	}

	module Dnd {
		export interface GridSource extends dojo.dnd.Source {
			grid: List;
		}
		export interface GridSourceConstructor extends dojo._base.DeclareConstructor<GridSource> {}

		export interface KwArgs {
			dndSourceType?: string;
			dndParams?: any;
			dndConstructor?: Function;
		}
	}

	interface DndConstructor extends dgrid.Constructor<Dnd, Dnd.KwArgs> {
		GridSource: Dnd.GridSource;
	}

	const Dnd: DndConstructor;

	export = Dnd;
}

declare module 'dgrid/extensions/Pagination' {
	import StoreMixin = require('dgrid/_StoreMixin');

	interface Pagination extends StoreMixin {
		rowsPerPage: number;
		pagingTextBox: boolean;
		previousNextArrows: boolean;
		firstLastArrows: boolean;
		pagingLinks: number;
		pageSizeOptions: number[];
		showLoadingMessage: boolean;
		i18nPagination: any;

		gotoPage(page: number): dojo.promise.Promise<any>;
	}

	module Pagination {
		export interface KwArgs extends StoreMixin.KwArgs {
			rowsPerPage?: number;
			pagingTextBox?: boolean;
			previousNextArrows?: boolean;
			firstLastArrows?: boolean;
			pagingLinks?: number;
			pageSizeOptions?: number[];
			showLoadingMessage?: boolean;
			i18nPagination?: any;
		}
	}

	interface PaginationConstructor extends dgrid.Constructor<Pagination, Pagination.KwArgs> {}

	const Pagination: PaginationConstructor;

	export = Pagination;
}

declare module 'dgrid/extensions/SingleQuery' {
	import StoreMixin = require('dgrid/_StoreMixin');
	export = StoreMixin;
}

declare module 'dgrid/util/has-css3' {
	import dojoHas = require('dojo/has');
	export = dojoHas;
}

declare module 'dgrid/util/misc' {
	module util {
		export let defaultDelay: number;
		export function throttle<T extends Function>(callback: T, context?: any, delay?: number): T;
		export function throttleDelayed<T extends Function>(callback: T, context?: any, delay?: number): T;
		export function debounce<T extends Function>(callback: T, context?: any, delay?: number): T;
		export function each<T, U>(arrayOrObject: T[], callback: (this: U, item: T, index: number, arrayOrObject: T[]) => void, context: U): void;
		export function each<T>(arrayOrObject: T[], callback: (item: T, index: number, arrayOrObject: T[]) => void): void;
		export function each<T>(arrayOrObject: {}, callback: (this: T, item: any, index: number, arrayOrObject: {}) => void, context: T): void;
		export function each(arrayOrObject: {}, callback: (item: any, index: number, arrayOrObject: {}) => void): void;

		export interface CssRuleHandle extends dojo.Handle {
			get(prop: string): string;
			set(prop: string, value: string): void;
		}

		export function addCssRule(selector: string, css: string): CssRuleHandle;
		export function escapeCssIdentifier(id: string, replace?: string): void;
	}

	export = util;
}

declare module 'dgrid/util/touch' {
	module touch {
		export let tapRadius: number;
		export let dbltapTime: number;

		export function selector(selector: string, type: string | dojo.ExtensionEvent, children?: boolean): dojo.ExtensionEvent;
		export function countCurrentTouches(event: Event, node: Element): number;

		export function tap(target: Element, listener: dojo.EventListener): dojo.Handle;
		export function dbltap(target: Element, listener: dojo.EventListener): dojo.Handle;
	}

	export = touch;
}
