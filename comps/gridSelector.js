'use strict'
import { Dialog, P, Div, Grid, Span } from 'smbls'

//= ===
// components for the grid selector
//= ===
// GridSpace - is a clickable space in a grid that will trigger state changes for selecting an area
//= ===
export const GridSpace = {
  state: {
    col: 0,
    row: 0,
    isSelected: false
  },
  extend: Span,
  props: {
    width: 'A',
    minWidth: 'Z',
    height: 'A',
    minHeight: 'Z',
    backgroundColor: '#E8F1FF',
    onClick: (ev, el, s, ctx) => {
      const ps = el.parent.state
      const x = el.key % ps.cols
      const y = Math.floor(el.key / ps.cols)
      console.log(`element.${el.key} was clicked! Col [${x}], Row [${y}]`)
      ps.UpdateGrid(parseInt(el.key), x, y, ps)
    },
    '.isSelected': {
      backgroundColor: '#3D7BD9'
    }
  }
}

//= ===
// GridSelector - holds the GridSpaces in a grid and is the source of state, has functions for managing selections
//= ===
export const GridSelector = {
  state: {
    rows: 0,
    cols: 0,
    x: -1,
    y: -1,
    grid: [],
    UpdateGrid: (key, x, y, s) => {
      console.log('fixing grid', key, x, y)

      for (let ii = (s.grid.length - 1); ii >= 0; ii--) {
        const curX = ii % s.cols
        const curY = Math.floor(ii / s.cols)
        if (curX <= x && curY <= y) {
          s.grid[ii].isSelected = true
        } else {
          s.grid[ii].isSelected = false
        }
      }

      s.update({ x, y, grid: s.grid })
    }
  },
  extend: Dialog,
  props: {
    boxShadow: '0px 5px 35px -10px #00000059',
    backgroundColor: '#f6f6f6',
    border: '1px solid #80808020',
    position: 'relative',
    justifyContent: 'space-between'
  },
  P_1: {
    extend: P,
    props: {
      fontFace: 'Verdana',
      fontWeight: '700',
      fontSize: '16px',
      margin: '0 0 A 0'
    },
    text: 'Grid Selection'
  },
  InnerGrid: (el, s) => ({
    extend: Grid,
    props: {
      gap: 'Y',
      padding: 'Y',
      borderRadius: 'Y',
      style: {
        gridTemplateColumns: `repeat(${s.cols}, 0fr)`,
        backgroundColor: 'white',
        padding: 'A'
      },
      children: (s.grid),
      childrenAs: 'state',
      childExtends: GridSpace,
      childProps: {
        text: ''
      }
    }
  }),
  Flex: {
    justifyContent: 'space-around',
    Div_1: {
      extend: Div,
      props: {
        display: 'inline-block',
        fontSize: 'Y2',
        textAlign: 'left',
        width: '48%'
      },
      Span_1: {
        extend: Span,
        text: 'Selection coordinates: ',
        Span_2: (el, s) => ({
          extend: Span,
          props: {
            fontWeight: 600
          },
          text: (`${s.x + 1}, ${s.y + 1}`)
        })
      }
    },
    Div_2: {
      extend: Div,
      props: {
        display: 'inline-block',
        fontSize: 'Y2',
        textAlign: 'right',
        width: '48%',
        marginLeft: '3%'
      },
      Span_3: {
        extend: Span,
        text: 'Total cells selected: ',
        Span_4: (el, s) => ({
          extend: Span,
          props: {
            fontWeight: 600
          },
          text: (`${(s.x + 1) * (s.y + 1)}`)
        })
      }
    }
  }
}
