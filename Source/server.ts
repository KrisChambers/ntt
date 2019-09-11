import * as http from "http"
import { greet } from "greet"

const server = http.createServer((req, res) =>
{
	const { url } = req

	if (!url) throw new Error()

	const name = url.split("=")[1]

	res.write(greet(name))
	res.end()
})

server.listen(8000)
