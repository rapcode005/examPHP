import { InertiaApp } from '@inertiajs/inertia-react'
import React from 'react'
import { render } from 'react-dom'
import axios, { AxiosResponse } from "axios"

const app = document.getElementById('app')

render(  
  <InertiaApp
    initialPage={JSON.parse(app.dataset.page)}
    resolveComponent={name => import(`./Pages/${name}`).then(module => module.default)}
  />,
  app
)

require('./bootstrap');
