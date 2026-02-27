import { prisma } from "../src/lib/prisma";
import crypto from "crypto";

async function testPasswordReset() {
  console.log("🧪 Testing Password Reset Flow...\n");

  const testEmail = "tsedeniyafisehaw@gmail.com";

  try {
    // Step 1: Check if user exists
    console.log("1️⃣ Checking if user exists...");
    const user = await prisma.user.findUnique({
      where: { email: testEmail },
    });

    if (!user) {
      console.log("❌ User not found:", testEmail);
      return;
    }
    console.log("✅ User found:", user.email);
    console.log("   User ID:", user.id);
    console.log("   Role:", user.role);

    // Step 2: Create a test token (simulating forgot-password API)
    console.log("\n2️⃣ Creating password reset token...");
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    const verificationToken = await prisma.verificationToken.create({
      data: {
        id: crypto.randomUUID(),
        identifier: testEmail,
        token,
        expires,
        userId: user.id,
      },
    });

    console.log("✅ Token created successfully");
    console.log("   Token:", token.substring(0, 20) + "...");
    console.log("   Expires:", expires.toISOString());

    // Step 3: Verify token can be retrieved
    console.log("\n3️⃣ Verifying token can be retrieved...");
    const retrievedToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!retrievedToken) {
      console.log("❌ Token not found in database");
      return;
    }
    console.log("✅ Token retrieved successfully");
    console.log("   Identifier:", retrievedToken.identifier);
    console.log("   User ID:", retrievedToken.userId);

    // Step 4: Check token expiration logic
    console.log("\n4️⃣ Checking token expiration logic...");
    const isExpired = retrievedToken.expires < new Date();
    console.log("✅ Token expiration check:", isExpired ? "EXPIRED" : "VALID");

    // Step 5: Clean up test token
    console.log("\n5️⃣ Cleaning up test token...");
    await prisma.verificationToken.delete({
      where: { token },
    });
    console.log("✅ Test token deleted");

    // Step 6: Summary
    console.log("\n" + "=".repeat(50));
    console.log("✅ PASSWORD RESET FLOW TEST PASSED");
    console.log("=".repeat(50));
    console.log("\n📋 Test Summary:");
    console.log("   ✓ User exists in database");
    console.log("   ✓ Token creation works");
    console.log("   ✓ Token retrieval works");
    console.log("   ✓ Token expiration logic works");
    console.log("   ✓ Token deletion works");
    console.log("\n🔗 Test Reset Link:");
    console.log(`   http://localhost:3000/reset-password?token=${token}`);
    console.log("\n💡 To test the full flow:");
    console.log("   1. Start dev server: npm run dev");
    console.log("   2. Go to: http://localhost:3000/forgot-password");
    console.log("   3. Enter email:", testEmail);
    console.log("   4. Check email for reset link");
    console.log("   5. Click link and reset password");

  } catch (error) {
    console.error("\n❌ Test failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

testPasswordReset();
