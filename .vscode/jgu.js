from transformers import AutoModel, AutoTokenizer
from diffusers import StableDiffusionPipeline

# GPT-2
print("Downloading GPT-2...")
gpt2_model = AutoModel.from_pretrained("gpt2", cache_dir="./pretrained")
gpt2_tokenizer = AutoTokenizer.from_pretrained("gpt2", cache_dir="./pretrained")

# BERT
print("Downloading BERT...")
bert_model = AutoModel.from_pretrained("bert-base-uncased", cache_dir="./pretrained")
bert_tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased", cache_dir="./pretrained")

# T5-small
print("Downloading T5-small...")
t5_model = AutoModel.from_pretrained("t5-small", cache_dir="./pretrained")
t5_tokenizer = AutoTokenizer.from_pretrained("t5-small", cache_dir="./pretrained")

# CLIP
print("Downloading CLIP...")
clip_model = AutoModel.from_pretrained("openai/clip-vit-base-patch32", cache_dir="./pretrained")
clip_tokenizer = AutoTokenizer.from_pretrained("openai/clip-vit-base-patch32", cache_dir="./pretrained")

# Stable Diffusion
print("Downloading Stable Diffusion...")
stable_diffusion = StableDiffusionPipeline.from_pretrained(
    "stabilityai/stable-diffusion-v1-4", cache_dir="./pretrained"
)

print("All models downloaded successfully.")