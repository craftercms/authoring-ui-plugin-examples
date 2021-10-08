import * as React from 'react'
import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined'

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
      <AutoAwesomeMotionOutlinedIcon />
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
