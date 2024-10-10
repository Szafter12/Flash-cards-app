import { useState, useCallback} from 'react'
import styles from './App.module.css'
import { Panel } from './components/Panel/Panel'
import { Button } from './components/Button/Button'
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage'
import { SubPageMemo } from './components/SubPage/SubPage'

function App() {
	const [isPanelShow, setIsPanelShown] = useState(true)
	const [error, setError] = useState(null)

	const handleError = useCallback(e => {
		setError(e.message)
		setTimeout(() => {
			setError(null)
		}, 3000)
	}, [])

	const memoizedFunction = useCallback(() => {}, [])

		
	return (
		<main className={styles.main}>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<Button
				onClick={() => {
					setIsPanelShown(prevShown => !prevShown)
				}}>
				{isPanelShow ? 'Schowaj panel' : 'Pokaż panel'}
			</Button>
			{isPanelShow && <Panel onError={handleError} />}
			<SubPageMemo isPanelShown={isPanelShow} func={memoizedFunction}/>
		</main>
	)
}

export default App
