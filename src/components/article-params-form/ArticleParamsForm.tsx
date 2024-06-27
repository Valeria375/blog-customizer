import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Text } from '../text';
import { Select } from '../select';
import clsx from 'clsx';
import { ArticleStateType, fontFamilyOptions } from 'src/constants/articleProps';


type ArticleParamsFormProps = {
	currentSettings: ArticleStateType;
	applySettings?: (newState: ArticleStateType) => void;
  }; 

export const ArticleParamsForm = (props:ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	const rootRef = useRef<HTMLDivElement>(null);
	const toggleForm = () => {
		// alert('клик на стрелку')
		setIsMenuOpen(!isMenuOpen);
		// alert(isMenuOpen)
	};
	// const [formState, setFormState] = useState<ArticleStateType>();
	// const handleSubmit = (event: React.FormEvent) => {
	// 	event.preventDefault();
	// 	props.applySettings(formState);
	//   };
	return (
		<div ref={rootRef}>
			<ArrowButton onClick={toggleForm} isOpen={isMenuOpen} />
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form className={styles.form}>
					<Text>Задайте параметры</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={null}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
