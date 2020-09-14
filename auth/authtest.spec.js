const supertest = require("supertest")
const server = require("../api/server")
// const db = require("../data/config")



describe("POST to register tests", () => {
	it("Should fail", async () => {
		const res = await supertest(server).post("/api/auth/register")
		expect(res.statusCode).toBe(500)
		// expect(res.type).toBe("application/json")
		// expect(res.body.length).toBeGreaterThanOrEqual(1)
		// expect(res.body[0].name).toBe("evo")
	})

	it("Should work now but find duplicate", async () => {
        const testUser = {username: "test", password: "test"}
        const res = await supertest(server).post("/api/auth/register").send(testUser)
        .then(res => { 
            expect(res.statusCode).toBe(409)

        })
	})

	
})