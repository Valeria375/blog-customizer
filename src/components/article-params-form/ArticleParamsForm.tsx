import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import clsx from 'clsx';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyClasses,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	currentSettings: ArticleStateType;
	applySettings: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentSettings,
	applySettings,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const toggleForm = () => {
		// alert('клик на стрелку')
		setIsMenuOpen(!isMenuOpen);
		// alert(isMenuOpen)
	};
	const [formState, setFormState] = useState<ArticleStateType>(currentSettings);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		applySettings(formState);
		// console.log(formState)
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		applySettings(defaultArticleState);
	  };
	  const handleOptionChange = (optionType: keyof ArticleStateType) => (selected: OptionType) => {
		setFormState((prevState) => ({
		  ...prevState,
		  [optionType]: selected,
		}));
	  };

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={toggleForm} isOpen={isMenuOpen} />
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text>Задайте параметры</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleOptionChange('fontFamilyOption')}
					/>
					<RadioGroup
					title='Размер шрифта'
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleOptionChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleOptionChange('fontColor')}
					/>
					  <Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleOptionChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleOptionChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset}/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
