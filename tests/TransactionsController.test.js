process.env.NODE_ENV = "test";
const HttpMock = require("node-mocks-http");
const TransactionsController = require("../controllers/TransactionsController");

describe("Transactions Controller", () => {
  const TransactionService = {
    update: jest.fn(),
    delete: jest.fn()
  };

  const transactionsController = new TransactionsController({
    TransactionService
  });

  describe("Update a transaction", () => {
    it("should return the updated transaction object", async () => {
      const transaction = {
        name: "Coffee"
      };
      const expectedResponse = Object.assign({}, transaction, {
        id: 20,
        user_id: 1,
        category_id: 1,
        amount: 2.5,
        created_at: "A long time ago"
      });

      const request = HttpMock.createRequest({
        method: "PATCH",
        params: { transactionid: 20 },
        body: transaction
      });
      const response = HttpMock.createResponse();

      TransactionService.update.mockReturnValueOnce(
        Promise.resolve(expectedResponse)
      );

      await transactionsController.updateTransactionById(request, response);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
    });
    it("should respond with 400 when bad request is sent", async () => {
      const transaction = {
        name: "Coffee"
      };

      const request = HttpMock.createRequest({
        method: "PATCH",
        params: { transactionid: "twenty" },
        body: transaction
      });
      const response = HttpMock.createResponse();

      TransactionService.update.mockReturnValueOnce(
        Promise.reject("Bad Request")
      );

      await transactionsController.updateTransactionById(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
    it("should respond with 403 when bad auth", async () => {
      const transaction = {
        name: "Coffee"
      };

      const request = HttpMock.createRequest({
        method: "PATCH",
        params: { transactionid: 20 },
        body: transaction
      });
      const response = HttpMock.createResponse();

      TransactionService.update.mockReturnValueOnce(
        Promise.reject("Forbidden")
      );

      await transactionsController.updateTransactionById(request, response);

      expect(response._getStatusCode()).toBe(403);
    });
  });
  describe("Delete a Transaction", () => {
    it("should return 200 on successful delete", async () => {
      const request = HttpMock.createRequest({
        method: "DELETE",
        params: { transactionid: 20 }
      });
      const response = HttpMock.createResponse();

      TransactionService.delete.mockReturnValueOnce(Promise.resolve());

      await transactionsController.deleteTransactionById(request, response);

      expect(response._getStatusCode()).toBe(200);
    });
    it("should return a 400 status code if bad request", async () => {
      const request = HttpMock.createRequest({
        method: "DELETE",
        params: { transactionid: "one" }
      });
      const response = HttpMock.createResponse();

      TransactionService.delete.mockReturnValueOnce(
        Promise.reject("Bad Request")
      );

      await transactionsController.deleteTransactionById(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
    it("should return a 403 status code if forbidden", async () => {
      const request = HttpMock.createRequest({
        method: "DELETE",
        params: { transactionid: "1" }
      });
      const response = HttpMock.createResponse();

      TransactionService.delete.mockReturnValueOnce(
        Promise.reject("Forbidden")
      );

      await transactionsController.deleteTransactionById(request, response);

      expect(response._getStatusCode()).toBe(403);
    });
  });
});
