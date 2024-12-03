import React from 'react';

import jsonData from '@stubs/generated.json';

import { EditableList } from '@components';

import './styles.scss';
import styles from './App.module.scss';

export const App = () => {
	return (
		<main>
			<h1 className={styles.title}>ESPROW</h1>
			<section>
				<EditableList list={jsonData} />
			</section>
		</main>
	);
};
