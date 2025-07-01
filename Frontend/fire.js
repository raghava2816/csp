export async function addUser(aadhar, password, phone) {
  const user = {
    name: aadhar,
    phone: phone.startsWith("91") ? phone : "91" + phone,
    userId: aadhar
  };

  console.log("📤 Sending registration:", user);

  try {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Registered successfully!");
      // Store user info in localStorage
      // Redirect to index page
      window.location.href = "index (1).html";
    } else {
      alert("❌ Error: " + data.error);
    }
  } catch (err) {
    console.error("❌ Network error", err);
    alert("❌ Network error");
  }
}

window.registerUser = function () {
  const aadhar = document.getElementById("aadhar").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  addUser(aadhar, password, phone);
}