import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ReactSelect from 'react-select'
import { TouchEvent } from 'react';

export class Select extends (ReactSelect) {
  wrapper: any
  menuContainer: HTMLDivElement
  handleMenuScroll: () => void
  handleMouseDownOnMenu: () => void
  _instancePrefix: string
  menu: HTMLDivElement

  renderOuter(options: any, valueArray: any, focusedOption: any) {
    const dimensions = this.wrapper ? this.wrapper.getBoundingClientRect() : null
    // @ts-ignore because we're inheriting from something I have no control over.
    const menu = super.renderMenu(options, valueArray, focusedOption)

    if (!menu || !dimensions) return null

    const maxHeight = document.body.offsetHeight - (dimensions.top + dimensions.height)
    return ReactDOM.createPortal(
      <div
        ref={ref => { this.menuContainer = ref }}
        className="Select-menu-outer"
        onClick={(e) => { e.stopPropagation() }}
        onTouchStart={(e) => { e.stopPropagation() }}
        style={{
          ...this.props.menuContainerStyle,
          zIndex: 9999,
          position: 'absolute',
          overflow: 'hidden',
          width: dimensions.width,
          top: dimensions.top + dimensions.height,
          left: dimensions.left,
          maxHeight: Math.min(maxHeight, 200),
        }}>
        <div
          ref={ref => { this.menu = ref }}
          role="listbox"
          tabIndex={-1}
          className="Select-menu"
          id={`${this._instancePrefix}-list`}
          style={{
            ...this.props.menuStyle,
            maxHeight: Math.min(maxHeight, 200)
          }}
          onScroll={this.handleMenuScroll}
          onMouseDown={this.handleMouseDownOnMenu}>
          {menu}
        </div>
      </div>,
      document.body
    )
  }

  handleTouchOutside(event: TouchEvent<HTMLElement>) {
    // The original react-select code is modified to also check if the touch came from inside the tethered container
    if (this.wrapper && !this.wrapper.contains(event.target) && !this.menuContainer.contains(event.target as HTMLElement)) {
      (this as any).closeMenu();
    }
  }
}
