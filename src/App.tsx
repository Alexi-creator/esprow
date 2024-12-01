import React from 'react';

import { EditableList } from '@components';

import './styles.scss';
import style from './App.module.scss';

export const App = () => {
	return (
		<>
			<h1 className={style.title}>ESPROW</h1>
			<EditableList />
		</>
	);
};
