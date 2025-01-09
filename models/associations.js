import transactions from './transactions.model.js';
import UtsavPackagesDb from './utsav_packages.model.model.js';
import UtsavBooking from './utsav_boking.model.js';
import UtsavGuestBooking from './utsav_guest_booking.model.js';
import UserDb from './users.model.js';

UtsavBooking.belongsTo(UtsavPackagesDb, {
  foreignKey: 'packageid',
  targetKey: 'id'
});

UtsavGuestBooking.belongsTo(UtsavPackagesDb, {
  foreignKey: 'packageid',
  targetKey: 'id'
});

UtsavPackagesDb.hasMany(UtsavBooking, {
  foreignKey: 'packageid',
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
UtsavPackagesDb.hasMany(UtsavGuestBooking, {
  foreignKey: 'packageid',
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

export {
  transactions,
  UtsavPackagesDb,
  UtsavBooking,
  UtsavGuestBooking,
  UserDb
};
