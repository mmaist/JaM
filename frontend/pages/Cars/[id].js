import { useRouter } from 'next/router'

export default function Car({ Car }) {
    const router = useRouter()
    const { id } = router.query;   
    
    return (<>
    <h1> hello {id}</h1>
    </>
    
  )
}