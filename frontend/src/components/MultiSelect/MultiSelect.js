/* eslint-disable no-unused-vars */
import React from 'react'

import { MultiSelect as CarbonMultiSelect } from 'carbon-components-react'

import items from './items'

const MultiSelect = props => {
  return (
    <CarbonMultiSelect
      id={props.id}
      titleText={props.titleText}
      label={props.label}
      useTitleInItem={false}
      itemToString={item => (item ? item.text : '')}
      items={items}
      onChange={props.handleOnChange}
    />
  )
}

export default MultiSelect
