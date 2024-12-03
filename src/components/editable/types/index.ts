export interface GeneratedProps {
	id: string
	isActive: boolean
	picture: string
	age: number
	name: string
	email: string
	address: string
	about: string
	registered: string
}

export interface TemporaryChanges {
	[id: string]: Partial<GeneratedProps>
}

export interface EditableListProps {
	list: GeneratedProps[]
}

export interface EditableRowProps {
	item: GeneratedProps
	setStateList: React.Dispatch<React.SetStateAction<GeneratedProps[]>>
	temporaryChanges: TemporaryChanges
}

export interface EditableComponentProps {
	title: GeneratedKeysProps,
	val: GeneratedValuesProps,
	item: GeneratedProps,
	setStateList: React.Dispatch<React.SetStateAction<GeneratedProps[]>>,
	temporaryChanges: TemporaryChanges,
}

export type GeneratedKeysProps = keyof GeneratedProps;
export type GeneratedValuesProps = GeneratedProps[GeneratedKeysProps];
