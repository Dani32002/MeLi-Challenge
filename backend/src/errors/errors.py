from werkzeug.exceptions import HTTPException

class ApiError(HTTPException):
    code = 418
    description = "I'm a teapot"

    def __init__(self, code, description):
        self.code = code
        self.description = description