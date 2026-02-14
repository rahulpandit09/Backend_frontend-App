from pydantic import BaseModel, EmailStr

class CreateTeacherSchema(BaseModel):
    name: str
    email: EmailStr
    password: str

class CreateStudentSchema(BaseModel):
    name: str
    email: EmailStr
    password: str
