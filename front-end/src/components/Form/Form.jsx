import { useState, useRef, forwardRef } from 'react'
import styles from './Form.module.css'
import { Button } from '../Button/Button'

export function Form({ onFormSubmit }) {
	const [translation, setTranslation] = useState('')
	const [category, setCategory] = useState('noun')

	function handleSubmit(e) {
		e.preventDefault()
		console.log(wordInputRef);
		const newItem = {
			word: wordInputRef.current.value,
			translation,
			category,
		}

		onFormSubmit(newItem)
	}

	const Input = forwardRef(function Input(props, ref) {
		return <input ref={ref} type='text' id='word' className={styles.input} />
	})

	const wordInputRef = useRef(null)

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<div className={styles.row}>
				<div className={styles.cell}>
					<label htmlFor='word'>Słowo</label>
					<Input ref={wordInputRef} />
				</div>
				<div className={styles.cell}>
					<label htmlFor='translation'>Tłumaczenie</label>
					<input
						type='text'
						id='translation'
						className={styles.input}
						value={translation}
						onChange={e => setTranslation(e.target.value)}
					/>
				</div>
			</div>
			<div>Wybierz kategorię:</div>
			<div className={styles.category}>
				<input
					type='radio'
					name='category'
					id='category-noun'
					checked={category === 'noun'}
					onChange={() => setCategory('noun')}
				/>
				<label htmlFor='category-noun'>Rzeczownik</label>
			</div>
			<div className={styles.category}>
				<input
					type='radio'
					name='category'
					id='category-verb'
					checked={category === 'verb'}
					onChange={() => setCategory('verb')}
				/>
				<label htmlFor='category-verb'>Czasownik</label>
			</div>
			<div>
				<Button>Dodaj</Button>
			</div>
		</form>
	)
}
