import { gql } from "@apollo/client";
import React, { useState } from "react";
import { Chains, Subgraph, Subgraphs, TheGraphProvider, useCreateSubgraph, useSubgraph } from "thegraph-react";

function Footium({ footium }: {
  readonly footium: Subgraph
}): JSX.Element {
  const { useQuery } = useSubgraph(footium);
  const [ item, setItem] = useState<string>('5')

  const { error, loading, data } = useQuery(gql`
    {
      transfers(first: ${item} orderBy: tokenID) {
        
      tokenID
       from
       to
       image

      }
    }
  `);

  console.log('data from GQL query:', data);
  
  return (
    <div style={{alignItems: "center", justifyContent: "center", padding: '20px'}}>
      <div style={{flex: 1, flexDirection: 'row', display: 'flex', borderStyle: 'solid', borderWidth: '1px', borderColor: 'Background', padding: 20, borderRadius: 5, marginBottom: 40}}>
        <div style={{flex: 1, textAlign: 'left', }}>
          <h1>Footium Browser</h1>
        </div>
        <div style={{textAlign: 'left', flex: 2, alignSelf: 'center'}}>
          <h3>Select number of NFTs per page: <select style={{fontSize: '20px', padding: '10px'}} onChange={(e) => setItem(e.currentTarget.value)}>
            <option value="5">5</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select></h3>
        </div>
      </div>

      {(error || loading) ? (
        <blockquote><br/><br/>"I learned all about life with a ball at my feet." - Ronaldinho</blockquote>
        ) : (
          

          (data as any).transfers.map((n: any, i: number) => {
            return (
              <div key={`nft-index-${i}`} style={{
                marginRight: 'auto',
                marginLeft: 'auto',
                padding: 10,
                margin: 20,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'ActiveBorder',
                flexDirection: 'row',
                display: 'flex',
                borderRadius: 5
              }}>
                <div style={{flex: 1, padding: 10, alignSelf: 'center', marginLeft: 25}}>
                  Footium Token id: <code>{n.tokenID}</code>
                </div>
                <div style={{flex: 1, padding: 10, alignSelf: 'center'}}>
                  <img 
                    style={{ width: '99px', imageRendering: '-moz-crisp-edges' }}
                    src={`https://${n.image}`} 
                    alt={`Footium #${n.tokenID}`} 
                  />
                </div>

                <div style={{
                  flex: 2,
                  flexDirection: 'column',
                  margin: 'auto',
                  justifyContent: 'space-around'
                }}>
                                    <div style={{flex: 1, padding: 10}}>
                    Transferred from:<br/>
                    <code style={{fontSize: 13.33}}>{n.from.toString()}</code>
                  </div>


                  <div style={{flex: 1, padding: 10}}>
                    Transferred to:<br/>
                    <code style={{fontSize: 13.33}}>{n.to.toString()}</code>
                  </div>
                </div>
              </div>
            )
          })
        )
      }
      <br/><br/><span style={{fontSize: 14}}>&copy; 2021</span>

    </div>
  )
}



export default function App(): JSX.Element {
  
  const footium = useCreateSubgraph({
    [Chains.MAINNET]: 'https://api.thegraph.com/subgraphs/name/sampriti026/footium',
  })
  const subgraphs = React.useMemo((): Subgraphs => {
    return [footium];
    
  }, [footium]);

  return (
    <TheGraphProvider chain={Chains.MAINNET} subgraphs={subgraphs}>
      <Footium footium={footium} />
    </TheGraphProvider>
  );
}