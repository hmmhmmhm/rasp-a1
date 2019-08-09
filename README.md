# rasp-a1
Demonstration

## Installation

> Do not run directly `npm install`, It might be cause error.

```bash
npm run init
```

## In Raspberry Pi

### Basic Init

```bash
sudo apt-get update
sudo apt-get upgrade
```

### Korean Fonts

```bash
sudo apt-get -y install ibus ibus-hangul
sudo apt-get -y install fonts-unfonts-core
ibus engine hangul
```

### XRDP(Basic Remote Control)

```bash
sudo apt-get remove realvnc-vnc-server
sudo apt-get install xrdp
```

### NodeJS Install

```bash
https://yoon.site/%EB%9D%BC%EC%A6%88%EB%B2%A0%EB%A6%AC%ED%8C%8C%EC%9D%B4-%EC%A0%9C%EB%A1%9C%EC%97%90-node-js%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0/
```

### Brew Fix

> It might be exist some error of `npm install cannot find module 'semver'`

Before Run below scripts, you must install brew `https://docs.brew.sh/Homebrew-on-Linux`

```bash
brew install yarn
yarn global add npm
```

### GTKTerm

```bash
sudo apt-get update
sudo apt-get install gtkterm
```

