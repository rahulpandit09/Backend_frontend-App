from app.database import SessionLocal
from app.models.user import User
from app.utils.hashing import hash_password

db = SessionLocal()

admin = User(
    full_name="Super Admin",
    email="admin@gmail.com",
    username="admin",
    password=hash_password("admin123"),
    role="admin"
)

db.add(admin)
db.commit()

print("Admin created successfully")

db.close()
