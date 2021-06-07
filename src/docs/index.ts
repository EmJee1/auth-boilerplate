// https://www.section.io/engineering-education/documenting-node-js-rest-api-using-swagger/

import basicInfo from './basicInfo.js'
import servers from './servers.js'
import tags from './tags.js'
import components from './components'
import paths from './paths'

export default {
	...basicInfo,
	...servers,
	...tags,
	...components,
	...paths,
}
