$path = 'css/style.css'
$content = Get-Content $path -Raw

$content = $content -replace '(?s):root\{.*?\n\}', @'
:root{
  --bg:#060b14;
  --surface:#0d1626;
  --surface-strong:#111b2e;
  --ink:#f4f7fb;
  --muted:#9aa7bd;
  --line:#223149;
  --accent:#8be3d4;
  --accent-strong:#bafcf3;
  --accent-soft:rgba(139,227,212,0.12);
  --warm:#f6c47a;
  --shadow:0 28px 80px rgba(0,0,0,0.38);
  --radius:14px;
  --max:1180px;
}
'@

Set-Content $path $content
