from transformers import GPT2LMHeadModel, GPT2Tokenizer
from transformers import T5Tokenizer, T5ForConditionalGeneration
from transformers import CLIPProcessor, CLIPModel
from transformers import BertTokenizer, BertForSequenceClassification
from diffusers import StableDiffusionPipeline
import os

# Set up directories
pretrained_path = os.path.join(os.getcwd(), "ai_models", "pretrained")
os.makedirs(pretrained_path, exist_ok=True)

# Download GPT-2
print("Downloading GPT-2...")
gpt2_model = GPT2LMHeadModel.from_pretrained("gpt2", cache_dir=os.path.join(pretrained_path, "gpt2"))
gpt2_tokenizer = GPT2Tokenizer.from_pretrained("gpt2", cache_dir=os.path.join(pretrained_path, "gpt2"))

# Download T5-small
print("Downloading T5-small...")
t5_model = T5ForConditionalGeneration.from_pretrained("t5-small", cache_dir=os.path.join(pretrained_path, "t5-small"))
t5_tokenizer = T5Tokenizer.from_pretrained("t5-small", cache_dir=os.path.join(pretrained_path, "t5-small"))

# Download BERT
print("Downloading BERT...")
bert_model = BertForSequenceClassification.from_pretrained("bert-base-uncased", cache_dir=os.path.join(pretrained_path, "bert"))
bert_tokenizer = BertTokenizer.from_pretrained("bert-base-uncased", cache_dir=os.path.join(pretrained_path, "bert"))

# Download CLIP
print("Downloading CLIP...")
clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32", cache_dir=os.path.join(pretrained_path, "clip"))
clip_processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32", cache_dir=os.path.join(pretrained_path, "clip"))

# Download Stable Diffusion
print("Downloading Stable Diffusion...")
stable_diffusion = StableDiffusionPipeline.from_pretrained(
    "CompVis/stable-diffusion-v1-4", 
    use_auth_token=True,  # Use authentication token from Hugging Face
    cache_dir=os.path.join(pretrained_path, "stable-diffusion")
)

print("All models downloaded successfully!")