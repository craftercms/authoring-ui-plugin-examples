import * as React from 'react'
import { createStyles, makeStyles, Typography } from '@material-ui/core'
import { useIntl } from 'react-intl'

const useStyles = makeStyles(() =>
  createStyles({
    test: {
      margin: '.5em',
      padding: '.5em',
      border: '2px solid #000',
      textAlign: 'center'
    }
  })
)

export interface ExampleComponentProps {
  text: string
}

const ReactComponent = ({ text }: ExampleComponentProps) => {
  const classes = useStyles()
  const { formatMessage } = useIntl()
  return (
    <Typography className={classes.test}>
      Hello from the react world, {text}.{' '}
      {formatMessage({
        id: 'myTestTranslation',
        defaultMessage: 'Hello, this is a test translation'
      })}
      .
    </Typography>
  )
}

export default ReactComponent
