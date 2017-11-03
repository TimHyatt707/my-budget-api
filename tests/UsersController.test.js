process.env.NODE_ENV = "test";
const HttpMock = require("node-mocks-http");
const UsersController = require("../controllers/UsersController");

describe("Users Controller", () => {
  const userService = {
    getUserById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn()
  };

  const transactionService = {
    getByUserId: jest.fn(),
    createTransaction: jest.fn()
  };

  const categoryService = {
    getByUserId: jest.fn(),
    createCategory: jest.fn()
  };

  const usersController = new UsersController({
    userService,
    transactionService,
    categoryService
  });

  describe("Create User", () => {
    it("should respond with 200 and the created user", async () => {
      const userBody = {
        email: "coolemail@yahoo.com",
        password: "password",
        username: "something"
      };

      const expectedResponse = Object.assign({}, userBody, { id: 1 });

      const request = HttpMock.createRequest({
        method: "POST",
        body: userBody
      });
      const response = HttpMock.createResponse();

      userService.createUser.mockReturnValueOnce(
        Promise.resolve(expectedResponse)
      );

      await usersController.createUser(request, response, () => {});

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
    });
    it("should respond with 400 when bad request is sent", async () => {
      const userBody = {
        email: "coolemail",
        password: undefined,
        username: "fkkfg"
      };

      const request = HttpMock.createRequest({
        method: "POST",
        body: userBody
      });
      const response = HttpMock.createResponse();

      userService.createUser.mockReturnValueOnce(Promise.reject("Bad Request"));

      await usersController.createUser(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
  });

  describe("Get User By Id", () => {
    it("should retrieve a user object with the user id", async () => {
      const request = HttpMock.createRequest({
        method: "GET",
        params: { userid: 1 }
      });

      const expectedResponse = {
        id: 1,
        username: "something",
        email: "something"
      };

      const response = HttpMock.createResponse();

      userService.getUserById.mockReturnValueOnce(
        Promise.resolve(expectedResponse)
      );

      await usersController.getUserById(request, response);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
    });
    it("should return a 400 when userId isn't valid input(number)", async () => {
      const request = HttpMock.createRequest({
        method: "GET",
        params: { userid: "one" }
      });
      const response = HttpMock.createResponse();

      userService.getUserById.mockReturnValueOnce(
        Promise.reject("Bad Request")
      );
      const next = jest.fn();

      await usersController.getUserById(request, response, next);

      expect(response._getStatusCode()).toBe(400);
    });
    it("should return a 404 when userId isn't found", async () => {
      const request = HttpMock.createRequest({
        method: "GET",
        params: { userid: 99 }
      });
      const response = HttpMock.createResponse();

      userService.getUserById.mockReturnValueOnce(
        Promise.reject("User not found")
      );
      const next = jest.fn();

      await usersController.getUserById(request, response, next);

      expect(response._getStatusCode()).toBe(404);
    });
    it("should return a 403 when token is valid but request is invalid", async () => {
      const request = HttpMock.createRequest({
        method: "GET",
        params: { userid: 2 }
      });
      const response = HttpMock.createResponse();

      userService.getUserById.mockReturnValueOnce(Promise.reject("Forbidden"));
      const next = jest.fn();

      await usersController.getUserById(request, response, next);

      expect(response._getStatusCode()).toBe(403);
    });
    it("should return a 401 when token is invalid", async () => {
      const request = HttpMock.createRequest({
        method: "GET",
        params: { userid: 2 }
      });
      const response = HttpMock.createResponse();

      userService.getUserById.mockReturnValueOnce(Promise.reject("Bad token"));

      await usersController.getUserById(request, response);

      expect(response._getStatusCode()).toBe(401);
    });
  });
  describe("Get Transactions By User", () => {
    it("should recieve transactions by user", async () => {
      const request = HttpMock.createRequest({
        method: "GET",
        params: { userid: 1 }
      });
      const response = HttpMock.createResponse();

      const expectedResponse = [
        {
          id: 1,
          user_id: 1,
          category_id: 1,
          name: "coffee",
          amount: 2.5,
          timestamp: "a long time ago"
        }
      ];

      transactionService.getByUserId.mockReturnValueOnce(
        Promise.resolve(expectedResponse)
      );

      const next = jest.fn();

      await usersController.getTransactionsByUser(request, response, next);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
      expect(response._getStatusCode()).toBe(200);
    });
    it("should return a 400 when userid is invalid", async () => {
      const request = HttpMock.createRequest({
        method: "GET",
        params: { userid: "one" }
      });
      const response = HttpMock.createResponse();

      transactionService.getByUserId.mockReturnValueOnce(
        Promise.reject("Bad Request")
      );

      await usersController.getTransactionsByUser(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
    it("should return a 403 when the user is authetenticaed but request is forbidden", async () => {
      const request = HttpMock.createRequest({
        method: "GET",
        params: { userid: 1 }
      });
      const response = HttpMock.createResponse();

      transactionService.getByUserId.mockReturnValueOnce(
        Promise.reject("Forbidden")
      );

      await usersController.getTransactionsByUser(request, response);

      expect(response._getStatusCode()).toBe(403);
    });
  });
  describe("Get Categories By User", () => {
    it("should retrieve categories by user id", async () => {
      const request = HttpMock.createRequest({
        method: "GET",
        params: { userid: 1 }
      });
      const response = HttpMock.createResponse();

      const expectedResponse = [
        { id: 1, user_id: 1, name: "Transportation", limit: 200 }
      ];

      categoryService.getByUserId.mockReturnValueOnce(
        Promise.resolve(expectedResponse)
      );

      const next = jest.fn();

      await usersController.getCategoriesByUser(request, response, next);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
      expect(response._getStatusCode()).toBe(200);
    });
    it("should return a 400 status code when request is invalid", async () => {
      const request = HttpMock.createRequest({
        method: "GET",
        params: { userid: "one" }
      });
      const response = HttpMock.createResponse();

      categoryService.getByUserId.mockReturnValueOnce(
        Promise.reject("Bad Request")
      );

      await usersController.getCategoriesByUser(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
    it("should return a 403 status code when token is valid but forbidden request", async () => {
      const request = HttpMock.createRequest();
      const response = HttpMock.createResponse();

      categoryService.getByUserId.mockReturnValueOnce(
        Promise.reject("Forbidden")
      );

      await usersController.getCategoriesByUser(request, response);

      expect(response._getStatusCode()).toBe(403);
    });
  });
  describe("Create Transaction By User", () => {
    it("should return a transaction object", async () => {
      const transaction = {
        user_id: 1,
        category_id: 1,
        name: "Coffee",
        amount: 2.5
      };
      const request = HttpMock.createRequest({
        method: "POST",
        params: { userid: 1 },
        body: transaction
      });
      const response = HttpMock.createResponse();

      const expectedResponse = Object.assign({}, transaction, { id: 1 });

      transactionService.createTransaction.mockReturnValueOnce(
        Promise.resolve(expectedResponse)
      );

      await usersController.createTransaction(request, response);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
    });
    it("should return a 400 status code if bad request", async () => {
      const transaction = {
        user_id: 1,
        category_id: 1,
        name: "Coffee",
        amount: 2.5
      };
      const request = HttpMock.createRequest({
        method: "POST",
        params: { userid: "one" },
        body: transaction
      });
      const response = HttpMock.createResponse();

      transactionService.createTransaction.mockReturnValueOnce(
        Promise.reject("Bad Request")
      );

      await usersController.createTransaction(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
    it("should return a 403 status code if bad request", async () => {
      const request = HttpMock.createRequest();
      const response = HttpMock.createResponse();

      transactionService.createTransaction.mockReturnValueOnce(
        Promise.reject("Forbidden")
      );

      await usersController.createTransaction(request, response);

      expect(response._getStatusCode()).toBe(403);
    });
  });
  describe("Create Category By User", () => {
    it("should return a category object", async () => {
      const category = {
        user_id: 1,
        name: "Transportation",
        amount: 200
      };
      const request = HttpMock.createRequest({
        method: "POST",
        params: { userid: 1 },
        body: category
      });
      const response = HttpMock.createResponse();

      const expectedResponse = Object.assign({}, category, { id: 1 });

      categoryService.createCategory.mockReturnValueOnce(
        Promise.resolve(expectedResponse)
      );

      await usersController.createCategory(request, response);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
    });
    it("should return a 400 status code if bad request", async () => {
      const category = {
        user_id: 1,
        name: "Transportation",
        limit: 200
      };
      const request = HttpMock.createRequest({
        method: "POST",
        params: { userid: "one" },
        body: category
      });
      const response = HttpMock.createResponse();

      categoryService.createCategory.mockReturnValueOnce(
        Promise.reject("Bad Request")
      );

      await usersController.createCategory(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
    it("should return a 403 status code if bad request", async () => {
      const request = HttpMock.createRequest();
      const response = HttpMock.createResponse();

      categoryService.createCategory.mockReturnValueOnce(
        Promise.reject("Forbidden")
      );

      await usersController.createCategory(request, response);

      expect(response._getStatusCode()).toBe(403);
    });
  });
  describe("Update a User", () => {
    it("should return the updated user", async () => {
      const user = {
        id: 1,
        email: "shory39@live.com"
      };
      const request = HttpMock.createRequest({
        method: "PATCH",
        params: { userid: 1 },
        body: user
      });
      const response = HttpMock.createResponse();

      const expectedResponse = Object.assign({}, user, {
        username: "Regulator"
      });

      userService.updateUser.mockReturnValueOnce(
        Promise.resolve(expectedResponse)
      );

      await usersController.updateUser(request, response);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
    });
    it("should return a 400 status code if bad request", async () => {
      const user = {
        id: "one",
        email: "shory39@live.com"
      };
      const request = HttpMock.createRequest({
        method: "PATCH",
        params: { userid: "one" },
        body: user
      });
      const response = HttpMock.createResponse();

      userService.updateUser.mockReturnValueOnce(Promise.reject("Bad Request"));

      await usersController.updateUser(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
    it("should return a 403 status code if bad request", async () => {
      const request = HttpMock.createRequest();
      const response = HttpMock.createResponse();

      userService.updateUser.mockReturnValueOnce(Promise.reject("Forbidden"));

      await usersController.updateUser(request, response);

      expect(response._getStatusCode()).toBe(403);
    });
  });
  describe("Delete a User", () => {
    it("should return 200 on successful delete", async () => {
      const request = HttpMock.createRequest({
        method: "DELETE",
        params: { userid: 1 }
      });
      const response = HttpMock.createResponse();

      userService.updateUser.mockReturnValueOnce(Promise.resolve());

      await usersController.deleteUser(request, response);

      expect(response._getStatusCode()).toBe(200);
    });
    it("should return a 400 status code if bad request", async () => {
      const request = HttpMock.createRequest({
        method: "DELETE",
        params: { userid: "one" }
      });
      const response = HttpMock.createResponse();

      userService.deleteUser.mockReturnValueOnce(Promise.reject("Bad Request"));

      await usersController.deleteUser(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
    it("should return a 403 status code if bad request", async () => {
      const request = HttpMock.createRequest();
      const response = HttpMock.createResponse();

      userService.deleteUser.mockReturnValueOnce(Promise.reject("Forbidden"));

      await usersController.deleteUser(request, response);

      expect(response._getStatusCode()).toBe(403);
    });
  });
});
