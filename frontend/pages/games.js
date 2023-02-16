import { useRouter } from 'next/router'
import useSWR from 'swr'
//import type { Person, ResponseError } from '../../interfaces'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

export default function PersonPage() {
  const { query } = useRouter()
  const { data, error, isLoading, isValidating } = useSWR<
    Person,
    ResponseError
  >(() => (query.id ? `/api/people/${query.id}` : null), fetcher)

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Hair color</th>
          <th>Skin color</th>
          <th>Eye color</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {isValidating ? (
            <td colSpan={7} align="center">
              Validating...
            </td>
          ) : (
            <>
              <td>{data.name}</td>
              <td>{data.height}</td>
              <td>{data.mass}</td>
              <td>{data.hair_color}</td>
              <td>{data.skin_color}</td>
              <td>{data.eye_color}</td>
              <td>{data.gender}</td>
            </>
          )}
        </tr>
      </tbody>
    </table>
  )
}

function disGames(aGames){

  const gamesArray = Object.values(aGames)

  return  (
    <div>
      <tr>
          <th>Matchup</th>
    </tr>
    
    {gamesArray.map((game) => (
      <tr key={game.id}>
        <td>{game.home_team}</td>
        <td>{game.away_team}</td>
        <td>{moment.utc(game.commence_time).tz('America/Los_Angeles').format('MMM DD-YY h:mm A')}</td>
        <td></td>
      </tr>
    ))}
  </div>
  )


}

function disOdds(game){

  return(
  <td>
  {game.bookmakers.map((bookmaker) => (
    <div key={bookmaker.key}>
      <tr><h2>{bookmaker.title}</h2></tr>
      {bookmaker.markets.map((market) => (
        <div key={market.key}>
          <h3>{market.key}</h3>
          {market.outcomes.map((outcome) => (
            <p key={outcome.name}>{outcome.name}: {outcome.price}</p>
          ))}
        </div>
      ))}
    </div>
  ))}
</td>
)

}