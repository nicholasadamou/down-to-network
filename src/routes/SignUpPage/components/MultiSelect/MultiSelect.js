import React, { useContext } from 'react'

import { MultiSelect as CarbonMultiSelect } from 'carbon-components-react'

import items from './items'

import Context from '../../../../contexts/Context'

const MultiSelect = () => {
	const { addSelection } = useContext(Context)

	return (
		<CarbonMultiSelect
			id="meeting_options"
			titleText="Who do you want to meet?"
			label="Select all that apply"
			useTitleInItem={false}
			itemToString={item => (item ? item.text : '')}
			items={items}
			onChange={(e) => addSelection(e.selectedItems)}
		/>
	)
}

export default MultiSelect
