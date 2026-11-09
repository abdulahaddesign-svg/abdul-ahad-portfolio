Add-Type -AssemblyName System.Drawing

$sourcePath = Join-Path $PSScriptRoot "..\public\brand\logo-monogram-dark.png"
if (-not (Test-Path $sourcePath)) {
    Write-Error "Source file not found: $sourcePath"
    exit 1
}

$source = [System.Drawing.Image]::FromFile((Resolve-Path $sourcePath).Path)
$aspect = [double]$source.Width / [double]$source.Height

function Generate-Icon {
    param(
        [int]$Size,
        [string]$OutPath,
        [bool]$IsIco = $false
    )

    $bmp = New-Object System.Drawing.Bitmap($Size, $Size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)

    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    # Rounded squircle background #25241F (Signature brand charcoal)
    $radius = [int]($Size * 0.22)
    $diameter = $radius * 2
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddArc(0, 0, $diameter, $diameter, 180, 90)
    $path.AddArc($Size - $diameter, 0, $diameter, $diameter, 270, 90)
    $path.AddArc($Size - $diameter, $Size - $diameter, $diameter, $diameter, 0, 90)
    $path.AddArc(0, $Size - $diameter, $diameter, $diameter, 90, 90)
    $path.CloseFigure()

    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#25241F"))
    $g.FillPath($brush, $path)

    # Subtle refined copper accent border (0.5% width on high res, min 1px if size >= 64)
    if ($Size -ge 64) {
        $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(40, 196, 133, 90), [float]($Size * 0.015))
        $g.DrawPath($pen, $path)
        $pen.Dispose()
    }

    # Center monogram logo keeping exact 1.356 aspect ratio (no stretch!)
    $targetW = [int]($Size * 0.76)
    $targetH = [int]($targetW / $aspect)
    $x = [int](($Size - $targetW) / 2)
    $y = [int](($Size - $targetH) / 2)

    $destRect = New-Object System.Drawing.Rectangle($x, $y, $targetW, $targetH)
    $g.DrawImage($source, $destRect, 0, 0, $source.Width, $source.Height, [System.Drawing.GraphicsUnit]::Pixel)

    $g.Dispose()
    $brush.Dispose()
    $path.Dispose()

    $fullOutPath = Join-Path $PSScriptRoot ("..\public\" + $OutPath)
    if (Test-Path $fullOutPath) {
        Remove-Item $fullOutPath -Force
    }

    if ($IsIco) {
        # Save as ICO using HIcon
        $hIcon = $bmp.GetHicon()
        $ico = [System.Drawing.Icon]::FromHandle($hIcon)
        $fileStream = [System.IO.File]::OpenWrite($fullOutPath)
        $ico.Save($fileStream)
        $fileStream.Close()
        $ico.Dispose()
    } else {
        $bmp.Save($fullOutPath, [System.Drawing.Imaging.ImageFormat]::Png)
    }

    $bmp.Dispose()
    Write-Host "Generated $OutPath ($Size x $Size)"
}

# Generate all standard favicon and app icon sizes
Generate-Icon -Size 16 -OutPath "favicon-16x16.png"
Generate-Icon -Size 32 -OutPath "favicon-32x32.png"
Generate-Icon -Size 48 -OutPath "favicon.ico" -IsIco $true
Generate-Icon -Size 180 -OutPath "apple-icon.png"
Generate-Icon -Size 192 -OutPath "icon-192.png"
Generate-Icon -Size 512 -OutPath "favicon.png"
Generate-Icon -Size 512 -OutPath "icon-512.png"

# Also copy favicon.ico and icon.png into src/app/ for Next.js App Router root handling
Copy-Item (Join-Path $PSScriptRoot "..\public\favicon.ico") (Join-Path $PSScriptRoot "..\src\app\favicon.ico") -Force
Copy-Item (Join-Path $PSScriptRoot "..\public\favicon.png") (Join-Path $PSScriptRoot "..\src\app\icon.png") -Force
Copy-Item (Join-Path $PSScriptRoot "..\public\apple-icon.png") (Join-Path $PSScriptRoot "..\src\app\apple-icon.png") -Force

$source.Dispose()
Write-Host "All icons generated successfully!"
