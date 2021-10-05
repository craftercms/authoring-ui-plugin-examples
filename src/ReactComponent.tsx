import * as React from 'react'
import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'

export interface ExampleComponentProps {
  text: string
}

const ReactComponent = ({ text }: ExampleComponentProps) => {
  const { formatMessage } = useIntl()
  return (
    <Typography
      sx={{
        margin: '.5em',
        padding: '.5em',
        border: '2px solid #000',
        textAlign: 'center'
      }}
    >
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
