import React from 'react'
import ReactDOM from 'react-dom'
import { useQuery, gql } from '@apollo/client'
import './index.css'

import { useAuth0 } from '@auth0/auth0-react'

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'

import Profile from './components/Profile'
import Definition from './components/ContentForm'
import NewDefinitionForm from './components/NewDefinitionForm'
import NewTheoremForm from './components/NewTheoremForm'
import NewPropositionForm from './components/NewPropositionForm'

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
              definitionsUsed {
                _id
              }
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

  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

  return (
    <div className="App">
      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error</p>}
      {data && !loading && !error && (
        <div id="testing">
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">Knowledge</Typography>
              {!isAuthenticated && (
                <Button color="inherit" onClick={() => loginWithRedirect()}>
                  Log In
                </Button>
              )}
              {isAuthenticated && (
                <Button color="inherit" onClick={() => logout()}>
                  Log out
                </Button>
              )}
            </Toolbar>
          </AppBar>
          <Profile />
          {data.AreaOfStudy.map((aos) => {
            return (
              <details key={aos._id}>
                <summary>{aos.title}</summary>
                {aos.subfields.map((sf) => {
                  return (
                    <details key={sf._id}>
                      <summary>{sf.title}</summary>
                      {sf.topics.map((t) => {
                        return (
                          <details key={t._id}>
                            <summary>{t.title}</summary>
                            {t.sections.map((sec) => {
                              return (
                                <details key={sec._id}>
                                  <summary>{sec.title}</summary>
                                  <details>
                                    <summary>Definitions</summary>
                                    {isAuthenticated && (
                                      <NewDefinitionForm parentId={sec._id} />
                                    )}
                                    {sec.definitions.map((def) => {
                                      return (
                                        <Definition key={def._id} def={def} />
                                      )
                                    })}
                                  </details>
                                  {/* Eventually turn this into one thing, command pattern? */}
                                  <details>
                                    <summary>Theorems</summary>
                                    {isAuthenticated && (
                                      <NewTheoremForm parentId={sec._id} />
                                    )}
                                    {sec.theorems.map((theo) => {
                                      return (
                                        <details key={theo._id}>
                                          <p>{theo.title}</p>
                                          <p>{theo.proof}</p>
                                        </details>
                                      )
                                    })}
                                  </details>
                                  <details>
                                    <summary>Propositions</summary>
                                    {isAuthenticated && (
                                      <NewPropositionForm parentId={sec._id} />
                                    )}
                                    {sec.theorems.map((theo) => {
                                      return (
                                        <details key={theo._id}>
                                          <p>{theo.title}</p>
                                          <p>{theo.proof}</p>
                                        </details>
                                      )
                                    })}
                                  </details>
                                  <details>
                                    <summary>Lemmas</summary>
                                    {isAuthenticated && (
                                      <NewTheoremForm parentId={sec._id} />
                                    )}
                                    {sec.theorems.map((theo) => {
                                      return (
                                        <details key={theo._id}>
                                          <p>{theo.title}</p>
                                          <p>{theo.proof}</p>
                                        </details>
                                      )
                                    })}
                                  </details>
                                </details>
                              )
                            })}
                          </details>
                        )
                      })}
                    </details>
                  )
                })}
              </details>
            )
          })}
        </div>
      )}
    </div>
  )
}
