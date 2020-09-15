const supertest = require("supertest")
const server = require("../api/server")
// const db = require("../data/config")



describe("get to jokes without auth", () => {
	it("Should fail", async () => {
		const res = await supertest(server).get("/api/jokes")
		expect(res.statusCode).toBe(401)
		// expect(res.type).toBe("application/json")
		// expect(res.body.length).toBeGreaterThanOrEqual(1)
		// expect(res.body[0].name).toBe("evo")
    })
    
	it("Should fail with message", async () => {
		const res = await supertest(server).get("/api/jokes")
		
		expect(res.body).toEqual({"message": "Invalid credentials"})
	
	})


})