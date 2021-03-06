import React from 'react'
import { create } from 'dva-core'
import { Provider } from 'react-redux'

export default function(options) {
	const app = create(options)

	// HMR workaround
	if (!GLOBAL.registered) options.models.forEach(model => app.model(model));
	GLOBAL.registered = true;
	app.start();

	// eslint-disable-next-line no-underscore-dangle
	const store = app._store
	app.start = container => () => <Provider store={store}>{container}</Provider>
	app.getStore = () => store

	return app
}