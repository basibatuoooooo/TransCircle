$COMMIT_MSG = "ai: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - AI assisted edit"

git add --all

$status = git status --porcelain
if ($status) {
    git commit -m $COMMIT_MSG
    git push origin main
    
    Write-Host "success!" -ForegroundColor Green
} else {
    Write-Host "fail!" -ForegroundColor Yellow
}