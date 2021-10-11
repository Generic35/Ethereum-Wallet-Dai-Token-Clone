const Migrations = artifacts.require("Migrations");
const DaiTokenMock = artifacts.require("DaiTokenMock");

module.exports = async function(deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(DaiTokenMock);
	const tokenMock = await DaiTokenMock.deployed();

	await tokenMock.mint('0x0995aA3856C52Fb841be1104642D3Fe116d79051', '1000000000000000000000')
};
