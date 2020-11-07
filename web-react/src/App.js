import React from 'react'
import ReactDOM from 'react-dom'
import { useQuery, gql } from '@apollo/client'
import './index.css'

import Definition from './components/ContentForm'
import NewDefinitionForm from './components/NewDefinitionForm'
import NewTheoremForm from './components/NewTheoremForm'

/**
 * Our data comes from users-data.js
 * -----------------------------
 */

const GET_EVERYTHING = gql`
  {
    AreaOfStudy {
      _id
      title
      subfields {
        _id
        title
        topics {
          _id
          title
          sections {
            _id
            title
            definitions {
              _id
              title
              content
            }
            theorems {
              _id
              title
              proof
            }
          }
        }
      }
    }
  }
`
function showHideDiv(ele) {
  var srcElement = document.getElementById(ele)
  if (srcElement != null) {
    if (srcElement.style.display == 'block') {
      srcElement.style.display = 'none'
    } else {
      srcElement.style.display = 'block'
    }
    return false
  }
}

/**
 * Our React component where we display data
 * -----------------------------
 */
export default function App() {
  const { loading, data, error } = useQuery(GET_EVERYTHING)

  return (
    <div className="App">
      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error</p>}
      {data && !loading && !error && (
        <div id="testing">
          {data.AreaOfStudy.map((aos) => {
            return (
              <div key={aos._id}>
                <h1>{aos.title}</h1>
                {aos.subfields.map((sf) => {
                  return (
                    <div key={sf._id}>
                      <h2>{sf.title}</h2>
                      {sf.topics.map((t) => {
                        return (
                          <div key={t._id}>
                            <h3>{t.title}</h3>
                            {t.sections.map((sec) => {
                              return (
                                <div key={sec._id}>
                                  <h4>{sec.title}</h4>
                                  <h5>Definitions</h5>
                                  <NewDefinitionForm parentId={sec._id} />
                                  {sec.definitions.map((def) => {
                                    return (
                                      <div key={def._id}>
                                        <Definition def={def} />
                                      </div>
                                    )
                                  })}
                                  <h5>Theorems</h5>
                                  <NewTheoremForm parentId={sec._id} />
                                  {sec.theorems.map((theo) => {
                                    return (
                                      <div key={theo._id}>
                                        <p>{theo.title}</p>
                                        <p>{theo.proof}</p>
                                      </div>
                                    )
                                  })}
                                </div>
                              )
                            })}
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
