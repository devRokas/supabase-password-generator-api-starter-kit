import { Application, Router, Context } from 'https://deno.land/x/oak@v12.6.1/mod.ts';
import { PasswordCriteria, generatePassword } from '../services/passwordService.ts';

const router = new Router();

router.post("/api/generate-password", async (context: Context) => {
  if (!context.request.hasBody) {
    context.throw(400, "No request body");
  }

  const body = await context.request.body().value;

  if (typeof body.length !== 'number') {
    context.response.status = 400;
    context.response.body = { error: "Invalid length. Length must be a number." };
    return;
  }

  if (body.length <= 0) {
    context.response.status = 400;
    context.response.body = { error: "Invalid length. Length must be a number greater than 0." };
  }

  const passwordCriteria: PasswordCriteria = {
    length: body.length || 12,
    hasUppercase: body.hasUppercase === true,
    hasLowercase: body.hasLowercase === true,
    hasNumbers: body.hasNumbers === true,
    hasSymbols: body.hasSymbols === true,
  };

  const password = generatePassword(passwordCriteria);

  context.response.body = { password };
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 54321 });
