import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Games() {
 
  const { games, error, isLoading } = useSWR('http://127.0.0.1:5000/getData', fetcher)

  if (error) return <div>Failed to load</div>
  console.log(JSON.stringify(games))
  console.log('hiiii')
  console.log('heloo')
  if (isLoading) return <div>Loading...</div>

 return  <p>{JSON.stringify(games)}</p>

 
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Sports Betting App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {Games()}
      </div>
    </>
  )

}
