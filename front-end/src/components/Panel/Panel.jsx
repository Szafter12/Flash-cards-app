import { useState, useEffect, useMemo } from 'react'
import { List } from '../List/List'
import { Form } from '../Form/Form'
import styles from './Panel.module.css'
import { FilterButton } from '../FilterButton/FilterButton'
import { getCategoryInfo } from '../../utils/getCategoryInfo'
import { Info } from '../Info/Info'
import axios from 'axios'

export function Panel({ onError }) {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	
	const [selectedCategory, setSelectedCategory] = useState(null)
	const url = 'http://localhost:3000/words'

	useEffect(() => {
		const params = selectedCategory ? `?category=${selectedCategory}` : ''

		axios.get(`${url}${params}`).then(res => {
			if (res.statusText === "OK"){
				setData(res.data)
				setIsLoading(false)
			} else {
				throw new Error("Błąd ładowania danych")
			}
			
		}).catch(onError)

	}, [selectedCategory, onError])


	const categoryInfo = useMemo(() => getCategoryInfo(selectedCategory), [selectedCategory])


	function handleFormSubmit(formData) {
		axios
			.post(url, {
				...formData,
			})
			.then(res => {
				if (!selectedCategory || selectedCategory === res.data.category) setData(prevData => [...prevData, res.data])
			})
	}

	function handleDeleteItem(id) {
		axios
			.delete(`${url}/${id}`)
			.then(res => {
				if (res.statusText === 'OK') {
					setData(prevData => prevData.filter(item => item.id !== id))
				} else {
					throw new Error('Błąd podczas usuwania')
				}
			})
			.catch(onError)
			
	}

	function handleFilterClick(category) {
		setSelectedCategory(category)
	}

	if (isLoading) {
		return <p>Ładowanie</p>
	}

	return (
		<>
			<section className={styles.section}>
				<Info>{categoryInfo}</Info>
				<Form onFormSubmit={handleFormSubmit} />
				<div className={styles.filters}>
					<FilterButton active={selectedCategory === null} onClick={() => handleFilterClick(null)}>
						Wszystkie
					</FilterButton>
					<FilterButton active={selectedCategory === 'noun'} onClick={() => handleFilterClick('noun')}>
						Rzeczowniki
					</FilterButton>
					<FilterButton active={selectedCategory === 'verb'} onClick={() => handleFilterClick('verb')}>
						Czasowniki
					</FilterButton>
				</div>
				<List data={data} onDeleteItem={handleDeleteItem} />
			</section>
		</>
	)
}
