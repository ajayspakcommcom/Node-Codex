#include <napi.h>
#include <string>

namespace {
std::string ComputeSimpleHash(const Napi::Buffer<unsigned char>& input) {
  std::size_t accumulator = 0;

  for (std::size_t index = 0; index < input.Length(); index += 1) {
    accumulator = (accumulator * 131) + input[index];
  }

  return std::to_string(accumulator);
}
}  // namespace

Napi::Value HashImage(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() != 1 || !info[0].IsBuffer()) {
    Napi::TypeError::New(env, "Expected a single Buffer argument").ThrowAsJavaScriptException();
    return env.Null();
  }

  Napi::Buffer<unsigned char> input = info[0].As<Napi::Buffer<unsigned char>>();
  std::string hash = ComputeSimpleHash(input);

  Napi::Object result = Napi::Object::New(env);
  result.Set("algorithm", "native-simple-hash");
  result.Set("hash", hash);
  return result;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set("hashImage", Napi::Function::New(env, HashImage));
  return exports;
}

NODE_API_MODULE(native_image_hash, Init)
