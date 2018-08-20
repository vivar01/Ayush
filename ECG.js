// defining constants needed for MAX 30003
const RREG = 1;
const WREG = 0;
datatosend = 0;
//SPI_temp_32b = [0 for i in range(10)]

const NO_OP = 0x00;
const STATUS = 0x01;
const EN_INT = 0x02;
const EN_INT2 = 0x03;
const MNGR_INT = 0x04;
const MNGR_DYN = 0x05;
const SW_RST = 0x08;
const SYNCH = 0x09;
const FIFO_RST = 0x0A;
const INFO = 0x0F;
const CNFG_GEN = 0x10;
const CNFG_CAL = 0x12;
const CNFG_EMUX = 0x14;
const CNFG_ECG = 0x15;
const CNFG_RTOR1 = 0x1D;
const CNFG_RTOR2 = 0x1E;
const ECG_FIFO_BURST = 0x20;
const ECG_FIFO = 0x21;
const RTOR = 0x25;
const NO_OP = 0x7F;

// setting clock generation
function ClockGeneration()  {
	control.waitMicros(100000);
	//basic.pause(100);
	pins.digitalWritePin(DigitalPin.P6, (pins.digitalReadPin(DigitalPin.P6) ^ 1));
}

// main loop function 
while (true) {
	MAX30003_Reg_Read(ECG_FIFO);
	data0 = SPI_temp_32b[0];
	data0 = data0 <<24;
	
	data1 = SPI_temp_32b[1];
	data1 = data0 <<16;
	
	data2 = SPI_temp_32b[2];
	data2 = data0 <<6;
	data2 = data2 & 0x03;
	
	data = (data0 | data1 | data2);
	ecgdata = data;
	MAX30003_Reg_Read(RTOR);
	RTOR_msb = SPI_temp_32b[0];
	RTOR_lsb = SPI_temp_32b[1];
	rtor = (RTOR_msb<<8 | RTOR_lsb);
	rtor = ((rtor >>2) & 0x3fff) ;
	HR = 60/rtor*0.008;
	RR = rtor*8;
	serial.writeNumber(HR);
	
	DataPacketHeader[0] = 0x0A;
    DataPacketHeader[1] = 0xFA;
    DataPacketHeader[2] = 0x0C;
    DataPacketHeader[3] = 0;
    DataPacketHeader[4] = 0x02;
   
    DataPacketHeader[5] = ecgdata;
    DataPacketHeader[6] = ecgdata>>8;
    DataPacketHeader[7] = ecgdata>>16;
    DataPacketHeader[8] = ecgdata>>24; 
   
    DataPacketHeader[9] =  RR ;
    DataPacketHeader[10] = RR >>8;
    DataPacketHeader[11] = 0x00;
    DataPacketHeader[12] = 0x00; 

    DataPacketHeader[13] = HR ;
    DataPacketHeader[14] = HR >>8;
    DataPacketHeader[15] = 0x00;
    DataPacketHeader[16] = 0x00; 
        
    DataPacketHeader[17] = 0x00;
    DataPacketHeader[18] = 0x0b;
	  
	for(i=0; i<19; i++) // transmit the data
	{
		serial.writeNumber(DataPacketHeader[i]);
	}
	basic.pause(1);
	
}

function MAX30003_Reg_Write(WRITE_ADDRESS, data) {
	// now combine the register address and the command into one byte:
	byte datatosend = (WRITE_ADDRESS<<1) | WREG;
	// take the chip select high to de-select:
	pins.digitalWritePin(DigitalPin.P16, 0);
	basic.pause(2);
	serial.writeBuffer(datatosend); // send register location
	serial.writeBuffer(data>>16); // number of register to wr
	serial.writeBuffer(data>>8); // number of register to wr
	serial.writeBuffer(data); // send value to record into register
	basic.pause(2);
	
	// take the chip select high to de-select:
	pins.digitalWritePin(DigitalPin.P16, 1);
}

function max30003_sw_reset()
{
	MAX30003_Reg_Write(SW_RST,0x000000);
	basic.pause(100);
}

function max30003_synch(void)
{
  MAX30003_Reg_Write(SYNCH,0x000000);
}


function MAX30003_Reg_Read(Reg_address){
	let SPI_TX_Buff;
	pins.digitalWritePin(DigitalPin.P16, 0);
	SPI_TX_Buff = (Reg_address<<1 ) | RREG ;
	serial.writeBuffer(SPI_TX_Buff);
	let i;
	for (i = 0; i < 3; i++)
	{
		SPI_temp_32b[i] = serial.readLine(0xff);
	}
	pins.digitalWritePin(DigitalPin.P16, 1);
}

function MAX30003_Read_Data(num_samples)
{
	let SPI_TX_Buff;
	pins.digitalWritePin(DigitalPin.P16, 0);
	SPI_TX_Buff = (ECG_FIFO_BURST<<1 ) | RREG ;
	serial.writeBuffer(SPI_TX_Buff); // send register location
	let i;
	for (i = 0; i < 3*num_samples; i++)
	{
		SPI_temp_Burst[i] = serial.readLine(0x00);
	}
	pins.digitalWritePin(DigitalPin.P16, 1);
}
	
function MAX30003_begin(){
	ClockGeneration();
	max30003_sw_reset();
	basic.pause(100);
	MAX30003_Reg_Write(CNFG_GEN, 0x081007);
	basic.pause(100);
	MAX30003_Reg_Write(CNFG_CAL, 0x720000);  // 0x700000 
	basic.pause(100);
	MAX30003_Reg_Write(CNFG_EMUX,0x0B0000);
	basic.pause(100);
	MAX30003_Reg_Write(CNFG_ECG, 0x005000);  // d23 - d22 : 10 for 250sps , 00:500 sps
	basic.pause(100);
	MAX30003_Reg_Write(CNFG_RTOR1,0x3fc600);
    max30003_synch();
	basic.pause(100);
}
